import { Token, Price } from '@uniswap/sdk-core'
// import { tickToPrice } from '@uniswap/v3-sdk'
import { tickToPrice } from 'delioswap_v3_sdk'

export function getTickToPrice(baseToken?: Token, quoteToken?: Token, tick?: number): Price<Token, Token> | undefined {
  if (!baseToken || !quoteToken || typeof tick !== 'number') {
    return undefined
  }
  return tickToPrice(baseToken, quoteToken, tick)
}