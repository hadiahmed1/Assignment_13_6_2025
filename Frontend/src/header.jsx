import React from 'react';
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Drawer, List, ListItem, ListItemText } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';

export default function Header() {
  return (
    <header>
      <div className='left_holder'>
        <img src='https://www.codelogicx.com/assets/images/logo.svg' width={150} />
      </div>

      <div className='right_holder'>
        <ul className='menu_holder'>
          <li>
            <a href='#'>
              <AccountCircleIcon />
              Employees
            </a>
          </li>
          <li>
            <a href='#'>
              <AccountBalanceWalletIcon />
              Salary
            </a>
          </li>
        </ul>
        <div className='user_profile_holder'>
          CX
        </div>
      </div>
    </header>
  );
}
