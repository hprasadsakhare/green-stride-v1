import { ethers } from 'ethers';
import RewardTokenABI from './RewardToken.json';
import RewardManagerABI from './RewardManager.json';

const provider = new ethers.providers.InfuraProvider(
  'homestead',
  process.env.NEXT_PUBLIC_INFURA_PROJECT_ID
);

const rewardTokenAddress = process.env.NEXT_PUBLIC_REWARD_TOKEN_ADDRESS;
const rewardManagerAddress = process.env.NEXT_PUBLIC_REWARD_MANAGER_ADDRESS;

const rewardToken = new ethers.Contract(rewardTokenAddress, RewardTokenABI, provider);
const rewardManager = new ethers.Contract(rewardManagerAddress, RewardManagerABI, provider);

export { provider, rewardToken, rewardManager };
