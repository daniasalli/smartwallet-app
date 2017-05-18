import * as settings from 'settings'
import {WalletManager} from 'smartwallet-contracts'

export default class WalletAgent {
  constructor() {
    this._manager = new WalletManager(settings.blockchain)
  }

  generateSeedPhrase(entropy) {
    let seed = this._manager.generateSeedPhrase(entropy)
    // only for testing testSeed has some ether on ropsten testnet
    let testSeed = 'mandate print cereal style toilet hole' +
      ' cave mom heavy fork network indoor'
    seed = testSeed
    return seed
  }

  registerWithSeedPhrase({userName, seedPhrase, pin}) {
    return this._manager.registerWithSeedPhrase({
      userName, seedPhrase, pin
    })
  }

  registerWithCredentials({userName, email, password}) {
    return this._manager.registerWithCredentials({userName, email, password})
  }

  loginWithSeedPhrase({userName, seedPhrase}) {
    return this._manager.loginWithSeedPhrase({userName, seedPhrase})
  }

  loginWithCredentials({userName, email, password}) {
    return this._manager.loginWithCredentials({userName, email, password})
  }

  expertLogin({passphrase, pin}) {
    return new Promise((resolve, reject) => {
      setTimeout(
        () => {
          resolve(new Wallet())
        },
        2000
      )
    })
  }
}
// TODO: DELETE THIS CLASS WHEN EDIT-CONTACT-UTIL and
// Login-webId exchange is updated
export class Wallet {
  constructor() {
    this.webId = localStorage.getItem('jolocom.webId')
    this.lightWallet = 'something'
  }

  updatePhone(phone) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve()
      }, 2000)
    })
  }

  setPhone(phone) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve()
      }, 2000)
    })
  }

  startConfirmEmail({email}) {
    return this._verification.startVerifyingEmail({webID: this.webID, email})
  }

  finishConfirmEmail({email, code}) {
    return this._verification.verifyEmail({webID: this.webID, email, code})
  }
}