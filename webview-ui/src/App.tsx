import { vscode } from './utilities/vscode'
import {
  VSCodeButton,
  VSCodeDataGrid,
  VSCodeDataGridCell,
  VSCodeDataGridRow,
  VSCodeBadge,
} from '@vscode/webview-ui-toolkit/react'
import './App.css'
import tokenFirewall from './assets/token-firewall.png'
import tokenOpenid from './assets/token-openid.png'
import tokenKey from './assets/token-key.png'
import tokenSpy from './assets/token-spy.png'
import tokenTimestamps from './assets/token-timestamps.png'

interface TestData {
  icon: string
  claim: string
  value: string
  description: string
}
const claims: TestData[] = [
  {
    icon: tokenFirewall,
    claim: 'upn',
    value: 'me@home.com',
    description: 'The number of daily users on the platform',
  },
  {
    icon: tokenOpenid,
    claim: 'sub',
    value: 'tester',
    description: 'The percentage of users who complete a desired action',
  },
  {
    icon: tokenKey,
    claim: 'sub',
    value: 'tester',
    description: 'The percentage of users who complete a desired action',
  },
  {
    icon: tokenSpy,
    claim: 'sub',
    value: 'tester',
    description: 'The percentage of users who complete a desired action',
  },
  {
    icon: tokenTimestamps,
    claim: 'sub',
    value: 'tester',
    description: 'The percentage of users who complete a desired action',
  },
]

function App() {
  function handleHowdyClick() {
    vscode.postMessage({
      command: 'hello',
      text: 'Hey there partner! 🤠',
    })
  }

  return (
    <main>
      <VSCodeButton onClick={handleHowdyClick}>Howdy!</VSCodeButton>
      <h1>Start</h1>
      <VSCodeDataGrid
        gridTemplateColumns="150px 450px 30%"
        aria-label="SubscriptionStatus"
      >
        <VSCodeDataGridRow rowType="sticky-header">
          <VSCodeDataGridCell cellType="columnheader" gridColumn="1">
            Claim
          </VSCodeDataGridCell>
          <VSCodeDataGridCell cellType="columnheader" gridColumn="2">
            Value
          </VSCodeDataGridCell>
          <VSCodeDataGridCell cellType="columnheader" gridColumn="3">
            Description
          </VSCodeDataGridCell>
        </VSCodeDataGridRow>
        {claims.map((claim) => {
          return (
            <VSCodeDataGridRow>
              <VSCodeDataGridCell gridColumn="1">
                <img
                  src={claim.icon}
                  alt={'logo'}
                  style={{ height: 16, width: 16, marginRight: 8 }}
                />
                <VSCodeBadge>{claim.claim}</VSCodeBadge>
              </VSCodeDataGridCell>
              <VSCodeDataGridCell gridColumn="2">
                {claim.value}
              </VSCodeDataGridCell>
              <VSCodeDataGridCell gridColumn="3">
                {claim.description}
              </VSCodeDataGridCell>
            </VSCodeDataGridRow>
          )
        })}
      </VSCodeDataGrid>
      <h1>End</h1>
    </main>
  )
}

export default App
