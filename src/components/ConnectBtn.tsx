import React, { useState, useEffect } from 'react';
import { Button, Modal, Space } from 'antd';
import { ConnectButton as RainbowKitConnectButton } from '@rainbow-me/rainbowkit';
import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import '@solana/wallet-adapter-react-ui/styles.css';

const MultiChainConnectButton: React.FC = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [detectedChains, setDetectedChains] = useState<string[]>([]);
  const [selectedChain, setSelectedChain] = useState<'evm' | 'solana' | null>(
    null
  );

  const solanaWallet = useWallet();

  useEffect(() => {
    const availableChains: string[] = [];
    if (window.ethereum) availableChains.push('evm');
    if (solanaWallet.wallet) availableChains.push('solana');
    setDetectedChains(availableChains);
  }, [solanaWallet.wallet]);

  const handleSelectChain = (chain: 'evm' | 'solana') => {
    setSelectedChain(chain);
    setIsModalVisible(false); // Close the modal
  };

  const renderConnectButton = () => {
    if (selectedChain === 'evm') {
      return <RainbowKitConnectButton />;
    }
    if (selectedChain === 'solana') {
      return <WalletMultiButton />;
    }
    return (
      <Button onClick={() => setIsModalVisible(true)} type="primary">
        Connect Wallet
      </Button>
    );
  };

  return (
    <div>
      {renderConnectButton()}

      {/* Ant Design Modal for selecting chain */}
      <Modal
        title="Select Chain"
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
        centered
      >
        <Space direction="vertical" style={{ width: '100%' }}>
          {detectedChains.includes('evm') && (
            <Button
              onClick={() => handleSelectChain('evm')}
              type="primary"
              block
            >
              EVM Wallet
            </Button>
          )}
          {/* {detectedChains.includes('solana') && ( */}
          <Button
            onClick={() => handleSelectChain('solana')}
            // type="primary"
            block
          >
            Solana Wallet
          </Button>
          {/* )} */}
        </Space>
      </Modal>
    </div>
  );
};

export default MultiChainConnectButton;
