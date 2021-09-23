import { Trans } from '@lingui/macro'
import useScrollPosition from '@react-hook/window-scroll'
import { CHAIN_INFO, SupportedChainId } from 'constants/chains'
import { darken } from 'polished'
import { useState } from 'react'
import { useShowClaimPopup, useToggleSelfClaimModal } from 'state/application/hooks'
import { useUserHasAvailableClaim } from 'state/claim/hooks'
import { useUserHasSubmittedClaim } from 'state/transactions/hooks'
import { useDarkModeManager } from 'state/user/hooks'
import { useETHBalances } from 'state/wallet/hooks'
import styled from 'styled-components/macro'
import { useActiveWeb3React } from '../../hooks/web3'
import { ExternalLink, TYPE } from '../../theme'

import { ProSidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar'
import 'react-pro-sidebar/dist/css/styles.css'
import { FaGem, FaHeart, FaSyncAlt, FaShoppingCart, FaVoteYea } from 'react-icons/fa'
import { Link, NavLink } from 'react-router-dom'

const SideBarFrame = styled.div<{ showBackground: boolean }>`
  display: grid;
  grid-template-columns: 120px 1fr 120px;
  align-items: center;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
  width: 260px;
  top: 0;
  position: relative;
  padding: 80px 0px 0px 0px;
  z-index: 3;
  position: relative;
  /* Background slide effect on scroll. */
  background-image: ${({ theme }) => `linear-gradient(to bottom, transparent 50%, ${theme.bg0} 50% )}}`};
  background-position: ${({ showBackground }) => (showBackground ? '0 -100%' : '0 0')};
  background-size: 100% 200%;
  box-shadow: 0px 0px 0px 1px ${({ theme, showBackground }) => (showBackground ? theme.bg2 : 'transparent;')};
  transition: background-position 0.1s, box-shadow 0.1s;
  background-blend-mode: hard-light;
`

const activeClassName = 'ACTIVE'

const StyledNavLink = styled(NavLink).attrs({
  activeClassName,
})`
  ${({ theme }) => theme.flexRowNoWrap}
  align-items: left;
  border-radius: 3rem;
  outline: none;
  cursor: pointer;
  text-decoration: none;
  color: ${({ theme }) => theme.text2};
  font-size: 1rem;
  font-weight: 500;
  padding: 8px 12px;
  word-break: break-word;
  overflow: hidden;
  white-space: nowrap;
  &.${activeClassName} {
    border-radius: 12px;
    font-weight: 600;
    justify-content: center;
    color: ${({ theme }) => theme.text1};
    background-color: ${({ theme }) => theme.bg2};
  }
`

const StyledExternalLink = styled(ExternalLink).attrs({
  activeClassName,
})<{ isActive?: boolean }>`
  ${({ theme }) => theme.flexRowNoWrap}
  align-items: left;
  border-radius: 3rem;
  outline: none;
  cursor: pointer;
  text-decoration: none;
  color: ${({ theme }) => theme.text2};
  font-size: 1rem;
  width: fit-content;
  margin: 0 12px;
  font-weight: 500;

  &.${activeClassName} {
    border-radius: 12px;
    font-weight: 600;
    color: ${({ theme }) => theme.text1};
  }

  :hover,
  :focus {
    color: ${({ theme }) => darken(0.1, theme.text1)};
    text-decoration: none;
  }
`

export default function SideBar() {
  const { account, chainId } = useActiveWeb3React()

  const userEthBalance = useETHBalances(account ? [account] : [])?.[account ?? '']
  const [darkMode] = useDarkModeManager()

  const toggleClaimModal = useToggleSelfClaimModal()

  const availableClaim: boolean = useUserHasAvailableClaim(account)

  const { claimTxn } = useUserHasSubmittedClaim(account ?? undefined)

  const [showUniBalanceModal, setShowUniBalanceModal] = useState(false)
  const showClaimPopup = useShowClaimPopup()

  const scrollY = useScrollPosition()

  const { infoLink } = CHAIN_INFO[chainId ? chainId : SupportedChainId.MAINNET]
  const infolink1 = 'https://ropsten.etherscan.io/address/0x540461b13a8aa1c3cf6bf2189aeb4afa1edba245'
  return (
    <ProSidebar>
      <Menu iconShape="square">
        <MenuItem icon={<FaGem />}>Dashboard</MenuItem>
        <SubMenu title="Menu" icon={<FaHeart />}>
          {/*
          <MenuItem icon={<FaGem />}>
            <Link id={`swap-nav-link`} to={'/swap'}>
              <Trans>Swap</Trans>
            </Link>
          </MenuItem>
         */}
          <MenuItem icon={<FaSyncAlt />}>
            <StyledNavLink id={`swap-nav-link`} to={'/swap'}>
              <Trans>Swap</Trans>
            </StyledNavLink>
          </MenuItem>
          {/*
          <MenuItem icon={<FaGem />}>
            <Link id={`pool-nav-link`} to={'/pool'}>
              <Trans>Pool</Trans>
            </Link>
          </MenuItem>
          */}
          <MenuItem icon={<FaShoppingCart />}>
            <StyledNavLink
              id={`pool-nav-link`}
              to={'/pool'}
              isActive={(match, { pathname }) =>
                Boolean(match) ||
                pathname.startsWith('/add') ||
                pathname.startsWith('/remove') ||
                pathname.startsWith('/increase') ||
                pathname.startsWith('/find')
              }
            >
              <Trans>Pool</Trans>
            </StyledNavLink>
          </MenuItem>
          {/*
          <MenuItem icon={<FaGem />}>
            <Link id={`pool-nav-link`} to={'/pool'}>
              <Trans>Pool</Trans>
            </Link>
          </MenuItem>
          */}
          {/*
          {chainId && chainId === SupportedChainId.MAINNET && (
            <MenuItem icon={<FaGem />}>
              <Link id={`stake-nav-link`} to={'/vote'}>
                <Trans>Vote</Trans>
              </Link>
            </MenuItem>
          )} */}
          {chainId && chainId === SupportedChainId.MAINNET && (
            <MenuItem icon={<FaVoteYea />}>
              <StyledNavLink id={`stake-nav-link`} to={'/vote'}>
                <Trans>Vote</Trans>
              </StyledNavLink>
            </MenuItem>
          )}
          <MenuItem icon={<FaGem />}>
            <StyledExternalLink id={`stake-nav-link`} href={infolink1}>
              <Trans>Charts</Trans>
              <sup></sup>
            </StyledExternalLink>
          </MenuItem>
          {/*
          <MenuItem icon={<FaGem />}>
            <Link id={`pool-nav-link`} to={'/pool'}>
              <Trans>Pool</Trans>
            </Link>
          </MenuItem>
          */}
          {/*
          <MenuItem icon={<FaGem />}>
            <StyledExternalLink id={`stake-nav-link`} href={'https://infonet.gist.ac.kr/?page_id=9274'}>
              <Trans>GIST Swap Status</Trans>
              <sup></sup>
            </StyledExternalLink>
          </MenuItem>
          */}
          <MenuItem icon={<FaGem />}>
            <StyledExternalLink id={`stake-nav-link`} href={'https://infonet.gist.ac.kr/'}>
              <Trans>INFONET</Trans>
              <sup></sup>
            </StyledExternalLink>
          </MenuItem>
          <MenuItem icon={<FaGem />}>
            <StyledExternalLink id={`stake-nav-link`} href={'http://ewww.gist.ac.kr/en/main.html'}>
              <Trans>GIST</Trans>
              <sup></sup>
            </StyledExternalLink>
          </MenuItem>
          {chainId && chainId === SupportedChainId.MAINNET && (
            <MenuItem icon={<FaVoteYea />}>
              <StyledExternalLink id={`stake-nav-link`} href={'http://172.26.16.177:30301/'}>
                <Trans>Springboot WebServer</Trans>
                <sup></sup>
              </StyledExternalLink>
            </MenuItem>
          )}
        </SubMenu>
      </Menu>
    </ProSidebar>
  )
}
