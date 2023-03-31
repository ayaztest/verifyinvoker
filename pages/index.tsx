import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { FormEvent } from 'react'


import  { useEffect, useState } from "react";
  import { 
  ConnectWallet,
  useAddress,
  useContract,
  
} from "@thirdweb-dev/react";

import  Card from "../componants/Card"



const Home: NextPage = () => {

    const [isKycAsBusiness, setIsKycAsBusiness] = useState(false);
  const [businessName, setBusinessName] = useState('');
  const [wtotal, setWtotal] = useState('')
  const [waddress, setWaddress] = useState('')
  const [paddress, setPaddress] = useState('')
  const [firstname, setFirstname] = useState('')
  const [lastname, setLastname] = useState('')
  const [email, setEmail] = useState('')
  const [country, setCountry] = useState('')
    const [total, setTotal] = useState('')
  const [wallet, setWallet] = useState('')
  const [selectedOption, setSelectedOption] = useState('no');
const [option, setOption] = useState(selectedOption)
  const [streetAddress, setStreetAddress] = useState('')
  const [ownedNFTNamestwo, setOwnedNFTNamestwo] = useState<string[]>([]);
  const [ownedNFTNames, setOwnedNFTNames] = useState<string[]>([]);
const [totaltwo, setTotaltwo] = useState('')
 const address = useAddress();
  const [hasClaimedNFT, setHasClaimedNFT] = useState(false)
  const [isClaiming, setIsClaiming] = useState(false)
  
const [showPopup, setShowPopup] = useState(false)
  
  
  const { contract: firstContract } = useContract(
        "0x7Cf0465f8a6172781126564B1254b2e0A49FE0F3", 
        "signature-drop"
    );

    
  useEffect(() => {
    if (!address) {
      return
    }

    const checkBalance = async () => {
      try {
        if ( firstContract) {
      const nfts = await  firstContract.getOwned(address);
          setHasClaimedNFT(nfts?.length > 0);
          
          setTotal(nfts.length.toString());
          
        }
             
      } catch (error) {
        setHasClaimedNFT(false)
        console.error("Failed to get NFTS", error)
      }
      }
    checkBalance()
  }, [address, firstContract])
 type NFT = {
  metadata: {
    name: string
  }
}

const getNFTNames = (nfts: NFT[]) => {
  const ownedNFTNames = nfts.map(nft => nft.metadata.name)
    .filter(name => typeof name === 'string') as string[];
  setOwnedNFTNames(ownedNFTNames);
};
  const getNFTNamestwo = (nfts: NFT[]) => {
  const ownedNFTNamestwo = nfts.map(nft => nft.metadata.name)
    .filter(name => typeof name === 'string') as string[];
  setOwnedNFTNamestwo(ownedNFTNamestwo);
};
  const mintNft = async () => {
    try {
      if (firstContract) {
        setIsClaiming(true)
        await firstContract.claim(1)
        setHasClaimedNFT(true)
      }
    } catch (error) {
      setHasClaimedNFT(false)
      console.error("failed to mint nft", error)
    }
    finally {
      setIsClaiming(false)
    }
}
 

 
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    let form = {
      firstname,
      lastname,
      email,
      country,
      wallet,
      total,
      selectedOption,
      streetAddress,
      nftNames: ownedNFTNames,
      totaltwo,
      nftNamestwo: ownedNFTNamestwo,
      businessName,
     waddress,
      wtotal,
    paddress
    }

    const rawResponse = await fetch('/api/submit', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(form),
    })
    const content = await rawResponse.json()

    // print to screen
    setShowPopup(true)
    
    // Reset the form fields
    setWallet('')
    setCountry('')
    setFirstname('')
    setLastname('')
    setEmail('')
    setTotal('')
    setSelectedOption('')
    setStreetAddress('')
    setOwnedNFTNames([])
    setTotaltwo('')
    setBusinessName('')
     setWaddress('')
    setWtotal('')
    setPaddress
  }
  useEffect(() => {
    if (!address) {
      return;
    }

    const getOwnedNFTNames = async () => {
      try {
        if (firstContract) {
          const nfts = await firstContract.getOwned(address);
          const ownedNFTNames = nfts.map((nft) => nft.metadata.name);
          const ownedNFTNamesFiltered = ownedNFTNames.filter((nft) => nft !== undefined) as string[];
setOwnedNFTNames(ownedNFTNamesFiltered);
          
        }
        
      } catch (error) {
        console.error("Failed to get owned NFT names", error);
      }
    };

    getOwnedNFTNames();
  }, [address, firstContract]);
  useEffect(() => {
    if (address) {
      setWallet(address);
    }
}, [address]);
 
  

  return (<div className='overflow-hidden'> 
        
    <div className='min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12 bg-cover'
  style={{ backgroundImage: "url('https://unsplash.com/photos/Uj3S6JiXxaA')" }}>
    <div className='relative py-3 sm:max-w-xl sm:mx-auto mb-14'>   <div>
           <p className='font-bold text-center text-lg pb-3 text-red-700'> **Please make sure you read the form carefully before filling it out.** </p>
 <div className="p-5 ">
 
    </div>
       
        </div>
     <ConnectWallet />  {hasClaimedNFT ? (
  <main className='relative mt-4 px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20 bg-clip-padding bg-opacity-60 border border-gray-200' >
   <div>
          <img src="https://metainvoker.com/wp-content/uploads/2022/09/invoker-logo-1.png" className="h-16 sm:h-24 rounded-md mx-auto" />
        </div>   <div className='max-w-5xl mx-auto py-2'>
        <form className='py-4 space-y-4' onSubmit={handleSubmit}>
          <div className='flex items-center justify-center'>
            <label htmlFor='firstname' className='sr-only'>
              First Name
            </label>
            <input
              value={firstname}
              onChange={(e) => setFirstname(e.target.value)}
              type='text'
              name='firstname'
              id='firstname'
              className='shadow-md focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-md border-gray-300 rounded-md'
              placeholder='First Name' required
            />
          </div>
          <div className='flex items-center justify-center'>
            <label htmlFor='lastname' className='sr-only'>
              Last Name
            </label>
            <input
              value={lastname}
              onChange={(e) => setLastname(e.target.value)}
              type='text'
              name='lastname'
              id='lastname'
              className='shadow-md focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-md border-gray-300 rounded-md'
              placeholder='Last Name' required
            />
          </div>
          <div className='flex items-center justify-center'>
            <label htmlFor='email' className='sr-only'>
              Email
            </label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type='email'
              name='email'
              id='email'
              className='shadow-md focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-md border-gray-300 rounded-md'
              placeholder='Your Email' required
            />
          </div>
          <div className='flex items-center justify-center'>
            <label htmlFor='streetAddress' className='sr-only'>
          Your Address (optional)
            </label>
            <input
              value={streetAddress}
              onChange={(e) => setStreetAddress(e.target.value)}
              type='text'
              name='streetAddress'
              id='streetAddress'
              className='shadow-md focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-md border-gray-300 rounded-md'
              placeholder='Your Address (optional)' 
            />
                </div>
                <div className='flex items-center justify-center'>
            <label htmlFor='country' className='sr-only'>
              country
            </label>
            <input
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              type='text'
              name='country'
              id='country'
              className='shadow-md focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-md border-gray-300 rounded-md'
              placeholder='Your Country' 
            />
                </div>
                   <div className="flex flex-col items-center justify-center">
                  <label htmlFor="nft-count" className="text-base font-medium text-left w-full mb-2">Please provide ALL wallets addresses that house ALL of your Invoker NFTs (Please
separate wallet addresses with a ; ):</label>
      <input
        type="text"
        id="nft-count"
        name="nft-count"
        value={totaltwo}
        onChange={(e) => setTotaltwo(e.target.value)}
        className="shadow-md focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-md border-gray-300 rounded-md"
        required
      />
    </div><div className="flex hidden flex-col items-center justify-center">
  <label htmlFor="nft-names" className="text-base font-medium text-left w-full mb-2">NFT Names:</label>
  <textarea
    id="nft-names"
    name="nft-names"
    value={ownedNFTNames.join(', ')}
    onChange={(e) => setOwnedNFTNames(e.target.value.split(','))}
    className="shadow-md focus:ring-indigo-500 focus:border-indigo-500 block w-96 sm:text-md border-gray-300 rounded-md"
    readOnly required
  />
</div><div>
        <input
          type="checkbox"
          id="businessCheckbox"
          checked={isKycAsBusiness}
                    onChange={() => setIsKycAsBusiness(!isKycAsBusiness)}
                     className="form-checkbox mr-3"
        />
        <label htmlFor="businessCheckbox" className='text-base cursor-pointer'>
          Do you want to help build meta invoker? (NOTE: Only developers, marketing expert can apply)
        </label>
      </div>
      {isKycAsBusiness && (
        <div>
          <label htmlFor="businessNameInput">Your profession?</label>
          <input
            type="text"
            id="businessNameInput"
            value={businessName}
                      onChange={(e) => setBusinessName(e.target.value)}
                      className="shadow-sm focus:outline-none focus:shadow-outline border border-gray-300 rounded-md py-2 px-4 block w-full appearance-none leading-normal"
          />
        </div>
      )}
            <div className='flex hidden items-center justify-center flex-col'>
          
                  
            <label htmlFor='wallet' className="text-base font-medium text-left w-full mb-2">Your Wallet Address:
            </label>
            <input
              value={wallet}
              onChange={(e) => setWallet(e.target.value)}
              type='tel'
              name='wallet'
              id='wallet'
              className='shadow-md focus:ring-indigo-500 focus:border-indigo-500 block w-96 sm:text-md border-gray-300 rounded-md'
             placeholder='Your Wallet'  readOnly 
            />
               
                </div> <div className="flex flex-col items-center justify-center border-t  border-gray-500">
                  <label htmlFor="nft-count" className="pt-2 text-base font-semibold text-left w-full mb-2">Total NFTs Owned By This Wallet
                    <span className='text-sm font-normal'> (This is AUTO-POPULATED FIELD & NON-EDITABLE, You Can Add More NFTs in The Field Above This), Please Connect Your Other
                    Invoker NFT Wallets To Verify All Other Invoker NFTs You Own:</span></label>
      <input
        type="text"
        id="nft-count"
        name="nft-count"
        value={total}
        onChange={(e) => setTotal(e.target.value)}
        className="shadow-md focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-md border-gray-300 rounded-md"
        readOnly required
      />
    </div>   <div className="flex flex-col mt-5">
    <div className="flex-row pb-3 border-b border-dotted border-gray-500 ">
      <input
        type="radio"
        id="option1"
        name="options"
        value="yes"
        checked={selectedOption === 'yes'}
        onChange={(e) => setSelectedOption(e.target.value)}
      />
      <label htmlFor="option1" className="text-md cursor-pointer font-medium ml-5">
        Yes, I am in the meta invoker discord server and i agree to terms & conditions.
      </label>
    </div>
    <div className="flex-row pt-3">
      <input
        type="radio"
        id="option2"
        name="options"
        value="no"
        checked={selectedOption === 'no'}
        onChange={(e) => setSelectedOption(e.target.value)}
      />
      <label htmlFor="option2" className="text-md font-medium cursor-pointer ml-5">
        I have not joined the discord server.
      </label>
    </div>
  </div> {selectedOption === "yes" && (<div>      <div className='flex  justify-center  mt-4 flex-col pb-5'>
                  <label htmlFor='waddress' className='text-sm  pb-3 font-semibold'>
                   Your username in discord server:
                  </label>
                  <input
                    value={waddress}
                    onChange={(e) => setWaddress(e.target.value)}
                    type='text'
                    name='waddress'
                    id='waddress'
                    className='shadow-md focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-md border-gray-300 rounded-md'
                    placeholder='Your username used in discord:' required
                  />
                </div> <p className='text-xs text-red-600 font-semibold text-justify  pt-5' >
                    **By submitting this form you agree to Meta Invoker Terms & Condition**</p><p style={{height: '100px', overflowY: 'auto'}} className='text-xs text-black-600  text-justify  pt-5' >
                    Terms and Conditions for Meta Invoker NFT Project
Welcome to our company's terms and conditions! We appreciate your interest in our services and products, and we strive to provide you with the best possible experience. However, before using any of our services or purchasing any of our products, we ask that you carefully read and understand the terms and conditions outlined below.

These terms and conditions govern your use of our website, services, and products, including any updates or new features that may be added from time to time. By using our website, services, or products, you agree to be bound by these terms and conditions. If you do not agree with any of the terms or conditions, please do not use our website, services, or products.

Please note that we may update these terms and conditions at any time without notice to you. Therefore, we recommend that you check this page regularly to stay informed about any changes. Your continued use of our website, services, or products after any changes to these terms and conditions constitute your acceptance of the changes.

Thank you for taking the time to read and understand our terms and conditions. We hope you enjoy our services and products!
                    
These Terms and Conditions ("Agreement") govern the use of the NFT project ("Service") provided by [Company Name] ("Company," "we," or "us"). By accessing or using the Service, you agree to be bound by this Agreement. If you do not agree to be bound by this Agreement, do not access or use the Service.

    Definitions

1.1. "NFT" means non-fungible tokens that are unique digital assets that represent ownership of a specific asset or product.

1.2. "Service" means the NFT platform operated by the Company that enables users to buy, sell, and trade NFTs.

1.3. "User" means any person who uses the Service.

    Use of Service

2.1. Eligibility. To use the Service, you must be at least 18 years of age or have reached the age of majority in your jurisdiction, whichever is greater. You must also have the legal capacity to enter into and be bound by this Agreement.

2.2. Registration. To use the Service, you must register and create an account. You must provide accurate, complete, and up-to-date information. You are responsible for maintaining the confidentiality of your account information and password and for all activities that occur under your account.

2.3. Compliance with Laws. You agree to comply with all applicable laws, regulations, and rules in connection with your use of the Service.

    Ownership

3.1. Ownership of NFTs. The ownership of an NFT represents ownership of a digital asset or product, but it does not give the owner any intellectual property rights to the underlying asset or product.

3.2. Ownership of Service. The Service and all intellectual property rights associated with the Service are owned by the Company.

    Sale and Purchase of NFTs

4.1. Sale of NFTs. The Company provides a platform for users to buy and sell NFTs. The Company does not own or have any interest in the NFTs being sold.

4.2. Purchase of NFTs. Users agree to pay the purchase price for NFTs they wish to purchase through the Service. The Company will hold the NFTs in escrow until the purchase price is paid in full.

    Prohibited Activities

5.1. You agree not to use the Service for any unlawful or prohibited purpose.

5.2. You agree not to engage in any activity that could harm the Service or its users.

    Indemnification

6.1. You agree to indemnify, defend, and hold harmless the Company and its affiliates, officers, directors, employees, agents, and licensors from and against any and all claims, damages, losses, liabilities, costs, and expenses (including reasonable attorneys' fees) arising out of or related to your use of the Service or your breach of this Agreement.

    Limitation of Liability

7.1. To the maximum extent permitted by law, the Company and its affiliates, officers, directors, employees, agents, and licensors will not be liable for any indirect, incidental, special, consequential, or punitive damages arising out of or related to this Agreement or the use of the Service.

    Termination

8.1. This Agreement may be terminated by either party at any time.

8.2. Upon termination, your right to use the Service will immediately cease, and you must immediately cease all use of the Service.

    No Refund or Buyback

10.1. Users understand and agree that once an NFT has been purchased through the Service, there are no refunds or buybacks.

10.2. The Company is not responsible for any loss or damage that may occur as a result of the purchase or sale of NFTs through the Service.

10.3. Users should carefully consider their purchase before making a transaction through the Service. The Company recommends that users seek independent advice before making any investment decisions related to NFTs.

10.4. Users acknowledge that the value of NFTs can be volatile and that the purchase and sale of NFTs involve a significant degree of risk. The Company is not responsible for any losses incurred as a result of the purchase or sale of NFTs through the Service.

    NFT is not an Investment

11.1. Users understand and agree that the NFT purchased through the Service is not an investment.

11.2. The NFT is a simple membership token that grants users access to the Service.

11.3. Users should not expect any return on investment or profit from the purchase of an NFT.

11.4. The Company does not provide any financial advice or recommendations related to the purchase or sale of NFTs. Users should seek independent advice before making any investment decisions.

        Profit Sharing

12.1. The Company may choose to share some of its profits with NFT holders from time to time, at its discretion.

12.2. However, such profit sharing does not constitute an investment return, dividend, or any other form of financial compensation.

12.3. The profit sharing program is intended as a reward to NFT holders for their support of the Service.

12.4. The amount or percentage of profits to be shared, if any, and the frequency of such sharing, are solely at the Company's discretion.

12.5. The Company may change or discontinue the profit sharing program at any time without prior notice to users.

12.6. Users acknowledge and agree that any profit sharing is not guaranteed and that the value of their NFT may not increase as a result of such profit sharing.
 12.7   The company reserves the right to not share any profit or proceeds from the sale of the company or transfer of ownership with NFT holders.
  12.8  The new owner of the company must honor the use of premium features for NFT holders, but may limit or modify these features at their discretion.
  12.9  The company is not liable for any damages, losses, or legal disputes resulting from the sale of the company or transfer of ownership to a new owner.

    NFT is Like a Subscription

13.1. Users understand and agree that purchasing the NFT is like buying a subscription to access premium features of an app.

13.2. The NFT does not represent an investment in the Company or a debt owed to the founders of the project.

13.3. The NFT is a simple membership token that grants users access to the Service.

13.4. Users should not expect any return on investment or profit from the purchase of an NFT.

13.5. The Company does not provide any financial advice or recommendations related to the purchase or sale of NFTs. Users should seek independent advice before making any investment decisions.
13.6    NFT holders agree to hold harmless the company and its owners, officers, directors, employees, and affiliates from any liability or claims resulting from the sale of the company or transfer of ownership to a new owner.
13.7    NFT holders acknowledge and agree that they have no ownership rights or equity stake in the company and that the NFT represents only a limited license to access premium features.

    User Conduct

14.1. Users are expected to act in good faith and refrain from engaging in any behavior that may harm the reputation or integrity of the Service.

14.2. Users should not engage in any activity that may be considered fraudulent, abusive, or unlawful.

14.3. Users are responsible for the content of their communications and should not make defamatory or false statements about the Service or other users.

14.4. The Company is not responsible for any opinions expressed by users and such opinions do not represent the views of the Company.

14.5. The Company reserves the right to suspend or terminate the account of any user who violates these terms and conditions.

    Governing Law and Dispute Resolution

15.1. These terms and conditions and any dispute or claim arising out of or in connection with them shall be governed by and construed in accordance with the laws of [insert governing law].

15.2. Any disputes, controversies, or claims arising out of or relating to these terms and conditions, or the breach, termination or validity thereof, shall be settled by arbitration in accordance with the rules of [insert arbitration organization] by one or more arbitrators appointed in accordance with said rules.

15.3. The arbitration shall take place in [insert location] and shall be conducted in the English language.

15.4. The arbitration award shall be final and binding on the parties, and judgment thereon may be entered in any court of competent jurisdiction.

15.5. The parties agree to waive any right to a jury trial or to participate in a class action lawsuit.

15.6. The prevailing party in any arbitration or legal proceeding under these terms and conditions shall be entitled to recover its reasonable attorneys' fees and costs.

15.7. Notwithstanding the foregoing, the Company reserves the right to seek injunctive or other equitable relief in any court of competent jurisdiction to protect its intellectual property rights or to prevent any unauthorized use or disclosure of confidential information.

    Disclaimer of Warranties

14.1. The Service is provided "as is" and "as available," and the Company makes no representations or warranties of any kind, whether express, implied, statutory, or otherwise, regarding the Service or any information or materials made available through the Service.

14.2. The Company disclaims all warranties, whether express, implied, statutory, or otherwise, including but not limited to any warranties of merchantability, fitness for a particular purpose, non-infringement, and any warranties arising out of course of dealing or usage of trade.

14.3. The Company does not warrant that the Service will be uninterrupted, error-free, or free from harmful components or viruses.

    Limitation of Liability

15.1. In no event shall the Company or its affiliates, officers, directors, employees, agents, or licensors be liable for any direct, indirect, incidental, special, consequential, or punitive damages arising out of or in connection with this Agreement or the use of the Service, including but not limited to damages for loss of profits, goodwill, use, data, or other intangible losses, even if the Company has been advised of the possibility of such damages.

15.2. To the extent permitted by applicable law, the total liability of the Company and its affiliates, officers, directors, employees, agents, and licensors, arising out of or in connection with this Agreement or the use of the Service, shall be limited to the amount paid by you, if any, to the Company for access to the Service.

15.3. The limitations of liability in this section shall apply to any theory of liability, including but not limited to negligence, strict liability, breach of contract, or breach of warranty, and shall survive any termination or expiration of this Agreement.
15.4.   Refund Liability: In the event that the company is required to issue a refund to a customer, the liability for the refund will be limited to the amount paid by the customer for the premium features. The company will not be liable for any other costs or damages, including but not limited to lost profits, consequential damages, or attorneys' fees. The customer agrees to release the company from any and all claims related to the premium features and to indemnify and hold the company harmless for any losses, damages, or expenses incurred by the company as a result of the customer's use of the premium features.
15.5. The company reserves the right to offer a partial refund, rather than a full refund, for any premium features or NFT purchases. The amount of the partial refund will be determined at the sole discretion of the company, and may take into account factors such as the length of time the user has held the premium features or NFT, the amount of use the user has received from the features or NFT, and any associated administrative or transaction fees. In the event that the company offers a partial refund, the user will be notified of the amount and any associated terms and conditions.

    Indemnification by User

16.1. You agree to indemnify, defend, and hold harmless the Company and its affiliates, officers, directors, employees, agents, and licensors from and against any and all claims, damages, losses, liabilities, costs, and expenses (including reasonable attorneys' fees) arising out of or related to your use of the Service, your breach of this Agreement, or your violation of any law or the rights of any third party.

16.2. The Company reserves the right, at its own expense, to assume the exclusive defense and control of any matter otherwise subject to indemnification by you, in which event you will cooperate with the Company in asserting any available defenses.

    Governing Law and Dispute Resolution

17.1. This Agreement shall be governed by and construed in accordance with the laws of the jurisdiction in which the Company is incorporated, without giving effect to any principles of conflicts of law.

17.2. Any dispute arising out of or in connection with this Agreement shall be resolved through arbitration in accordance with the rules of the American Arbitration Association.

17.3. The arbitration shall take place in the jurisdiction in which the Company is incorporated, and the arbitrator's decision shall be final and binding on the parties.

    Miscellaneous

18.1. This Agreement constitutes the entire agreement between you and the Company regarding the use of the Service and supersedes all prior agreements and understandings, whether written or oral, regarding the same subject matter.

18.2. If any provision of this Agreement is found to be invalid or unenforceable, the remaining provisions shall remain in full force and effect.

                    18.3. The failure of the Company to enforce any right or provision of this Agreement shall not constitute a waiver of such right or provision.
                  Thank you for entrusting us with your business. We are committed to providing you with the best possible service and ensuring your satisfaction with our platform.

Please take the time to carefully read through our terms of service and contact us if you have any questions or concerns. We strive to maintain transparency and open communication with all of our customers.

By using our platform, you agree to be bound by these terms of service. We reserve the right to make changes to these terms at any time and will notify you of any updates.

Once again, thank you for choosing our platform. We look forward to working with you and helping you achieve your goals. You can also check the terms & condition on our website if you are having trouble reading it here. Thanks</p></div>)}
                
          <div className='flex items-center justify-center'>
            <button
              type='submit'
              className='flex items-center justify-center text-sm w-full rounded-md shadow py-3 px-2 text-white bg-indigo-600'
            >
              Submit
            </button>
                </div><div className='flex  '>
                  <p className='text-xs text-red-600 font-semibold text-justify  pt-5'>   Please Note this is not a KYC process, your filling this form only to get access to private server in discord.
                  If we needed to do KYC, you will be asked again in the future to verify yourself. For more information please check our website or discord private server. Thank you</p>     
       </div> </form>
 
         
          
       
        {showPopup && (
          <div className='fixed z-50 bottom-0 inset-x-0 px-4 pb-4 sm:inset-0 sm:flex sm:items-center sm:justify-center'>
  <div className='fixed inset-0 transition-opacity'>
    <div className='absolute inset-0 bg-gray-500 opacity-75'></div>
  </div>
  <div className='bg-white rounded-lg px-4 pt-5 pb-4 overflow-hidden shadow-xl transform transition-all sm:max-w-xl sm:w-full'>
    <div>
      <div className='mb-4'>
        <div className='text-2xl font-bold text-center text-cyan-900'>Success</div>
        <div className='mt-2 text-base leading-6 text-gray-500'>
                          <p className='text-center text-lg font-semibold text-cyan-800'>Thank you for submitting your questionnaire! Please click the green button below to finish your Discord Verification process via the Token of Trust platform, and please also check/monitor the email you provided
                            in the form for any additional information that may
                            come in the next few days/weeks.</p>
        </div>
      </div>
      <div className='flex flex-col justify-around mt-5 sm:mt-6'>
        <a href='https://discord.gg/pTKpgdW23R' target='_blank' rel='noopener noreferrer'>
          <button
            type='button'
            className='inline-flex mb-4 justify-center w-full rounded-md border border-transparent px-4 py-2  bg-green-500 text-md leading-6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo transition ease-in-out duration-150 sm:text-sm sm:leading-5'
          >
           Our Discord Server
          </button>
        </a> 
  <span className='  rounded-md shadow-sm w-full'>
    <a href='https://metainvoker.com' target='_blank' rel='noopener noreferrer'>
      <button
        type='button'
        className='inline-flex justify-center items-center w-full rounded-md border border-transparent px-4 py-2 bg-indigo-600 text-md leading-6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo transition ease-in-out duration-150 sm:text-sm sm:leading-5'
      >
        Invoker Website
      </button>
    </a>
  </span>

      </div>
      <button
        type='button'
        className='absolute top-0 right-0 p-2 text-gray-500 hover:text-white focus:outline-none focus:text-white transition ease-in-out duration-150'
        onClick={() => setShowPopup(false)}
      >
        ×
      </button>
    </div>
  </div>
</div>

        )}
      </div>

     
    </main> ):(<p className='mt-5 font-semibold text-center '>you dont have our membership sir/madam</p>)}</div>
    <div className='  flex object-center items-center'>
      <div className='max-w-4xl mx-auto  flex flex-col p-6'><Card /></div>  </div></div> </div> 
  )

}
export default Home
