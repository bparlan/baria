const connectWalletButton = document.getElementById('connectWalletButton');
const disconnectWalletButton = document.getElementById('disconnectWalletButton');

const walletAddressDisplay = document.getElementById('walletAddress');
const walletBalanceDisplay = document.getElementById('walletBalance');

connectWalletButton.addEventListener('click', async () => {
    if (typeof window.ethereum !== 'undefined') {
        try {
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            await provider.send("eth_requestAccounts", []);
            const signer = provider.getSigner();
            const address = await signer.getAddress();
            walletAddressDisplay.innerText = `${address}`;

            const balance = await provider.getBalance(address);
            walletBalanceDisplay.innerText = `Balance: ${ethers.utils.formatEther(balance)} ETH`;

            const addressToResolve = `${address}`;
            const walletNameDisplay = resolveAddressToENS(addressToResolve);

            // Toggle buttons
            connectWalletButton.style.display = 'none';
            disconnectWalletButton.style.display = 'inline-block';

        } catch (err) {
            console.error(err.message);
        }
    } else {
        alert("Please install MetaMask or any Ethereum wallet!");
    }
});

function disconnectWallet() {
    // Clear wallet details
    walletAddressDisplay.innerText = '';
    walletBalanceDisplay.innerText = '';

    // Toggle buttons
    connectWalletButton.style.display = 'inline-block';
    disconnectWalletButton.style.display = 'none';
}
disconnectWalletButton.addEventListener('click', disconnectWallet);
async function fetchTokenContracts(tokenAddresses) {
    const contracts = [];
    for (const address of tokenAddresses) {
        const contract = new ethers.Contract(address, tokenAbi, provider);
        contracts.push(contract);
    }
    return contracts;
}
const provider = new ethers.providers.CloudflareProvider();

async function resolveAddressToENS(address) {
    const resolverAddress = "0x00000000000C2e074eCc679009DA471295Ce7297"; // ENS Resolver address
    const resolverContract = new ethers.Contract(resolverAddress, ENSResolverABI, provider);

    try {
        const name = await resolverContract.name(address);
        console.log(name);
    } catch (error) {
        console.error("Error resolving ENS name:", error);
        // Handle the error, e.g., if the address doesn't have an ENS name
    }
}