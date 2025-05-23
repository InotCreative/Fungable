import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';

export const TransactionContext = React.createContext();

const { ethereum } = window;

export const TransactionProvider = ({ children }) => {
  const [currentAccount, setCurrentAccount] = useState('');
  const [formData, setFormData] = useState({ addressTo: '', amount: '', message: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [transactionCount, setTransactionCount] = useState(localStorage.getItem('transactionCount'));
  const [transactions, setTransactions] = useState([]);

  const handleChange = (e, name) => {
    setFormData((prevState) => ({ ...prevState, [name]: e.target.value }));
  };

  const checkIfWalletIsConnected = async () => {
    try {
      if (!ethereum) return alert('Please install MetaMask.');

      const accounts = await ethereum.request({ method: 'eth_accounts' });

      if (accounts.length) {
        setCurrentAccount(accounts[0]);
        // getAllTransactions();
      } else {
        console.log('No accounts found');
      }
    } catch (error) {
      console.log(error);
      throw new Error('No ethereum object.');
    }
  };

  const connectWallet = async () => {
    try {
      if (!ethereum) return alert('Please install MetaMask.');

      const accounts = await ethereum.request({ method: 'eth_requestAccounts' });

      setCurrentAccount(accounts[0]);
    } catch (error) {
      console.log(error);
      throw new Error('No ethereum object.');
    }
  };

  const sendTransaction = async () => {
    try {
      if (!ethereum) return alert('Please install MetaMask.');

      const { addressTo, amount, message } = formData;
      const parsedAmount = ethers.parseEther(amount);

      await ethereum.request({
        method: 'eth_sendTransaction',
        params: [{
          from: currentAccount,
          to: addressTo,
          gas: '0x5208', // 21000 GWEI
          value: parsedAmount.toString(16),
        }],
      });

      setIsLoading(true);
      console.log(`Loading - ${transactionHash.hash}`);
      await transactionHash.wait();
      setIsLoading(false);
      console.log(`Success - ${transactionHash.hash}`);

      setFormData({ addressTo: '', amount: '', message: '' });

    } catch (error) {
      console.log(error);
      throw new Error('No ethereum object.');
    }
  };

  useEffect(() => {
    checkIfWalletIsConnected();
  }, []);

  return (
    <TransactionContext.Provider value={{ 
      connectWallet, 
      currentAccount, 
      formData, 
      setFormData, 
      handleChange, 
      sendTransaction,
      isLoading
    }}>
      {children}
    </TransactionContext.Provider>
  );
};
