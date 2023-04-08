# Welcome to the 1delta Docs!

1delta is a decentralized margin aggregator service that allows users to directly build margin positions using established DEXs and lending protocols. Our objective is to bring a universal aggregator service (comparable to Interactive Brokers in CeFi) to EVMs. Unbound by our own liquidity, we do not have the same limitations that comparable decentralized aggregators experience. Our goal is to partner with and aggregate established protocols in the space and not to directly compete against them.


At the moment, crypto traders are limited in the options they have for building leverage while trading. If they choose to use money market protocols for building margin positions they will face a multi-step process that spans multiple dApps, is error-prone, and has low visibility.


Existing aggregator/derivatives platforms have been the go-to solution for leveraged trading, however, they come with a steep tradeoff.  While centralized players like FTX have failed users by misusing their funds, decentralized platforms like dYdX or GMX are required to provide both lending and trading liquidity often resulting in poor trading performance.


Our vision is to bring fully-featured, decentralized aggregator services to EVMs. This includes
* **Single-click margin trading** (opening, closing positions, debt- and collateral swaps)
* **Connecting established DEXs with established lending protocols** to allow our users to access top-notch trading performance and highly competitive deposit and borrow rates
* **Seamless UX and visibility** - easy risk management through risk parameter displays and single-click self-liquidations
* **Full transparency** - Users hold the lending protocol balances themselves and can always see and access their raw balances with the lender
* Lending protocols have been less accessible to traders who are looking for a fully-featured aggregator. With 1Delta, we hope to open the door for these traders to take advantage of the **strong liquidity and attractive rates** on large lending protocols without sacrificing the tools they have come to expect while trading.

After jump-starting our initial traction, 1Delta will maintain itself through the collection of small fees on top of DEX trading fees and interest income. We are also exploring the potential of payment for TVL / order flow models.

---

## Quick Start

### Installation

- Requirement: [Node.js](https://nodejs.org) [LTS](https://nodejs.org/about/releases/) version

The best way to install HonKit is via **NPM** or **Yarn**.

```
$ npm init --yes
$ npm install honkit --save-dev
```

⚠️ Warning:

- If you have installed `honkit` globally, you must install each plugins globally as well
- If you have installed `honkit` locally, you must install each plugins locally as well

We recommend installing `honkit` locally.

### Run locally

Preview and serve your book using:

```
$ npx honkit serve
```

Or build the static website using:

```
$ npx honkit build
```

You can start to write your book!