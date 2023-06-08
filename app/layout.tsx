import Navbar from './components/navbar/Navbar';
import Modal from './components/modals/Modal';
import './globals.css';
import { Nunito } from 'next/font/google';

const inter = Nunito({ subsets: ['latin'] });

export const metadata = {
  title: 'Airbnb',
  description: 'Airbnb clone',
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Modal isOpen />
        <Navbar />
        {children}
      </body>
    </html>
  );
};

export default RootLayout;
