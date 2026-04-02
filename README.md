# n8n-nodes-fetch-ai

> **[Velocity BPA Licensing Notice]**
>
> This n8n node is licensed under the Business Source License 1.1 (BSL 1.1).
>
> Use of this node by for-profit organizations in production environments requires a commercial license from Velocity BPA.
>
> For licensing information, visit https://velobpa.com/licensing or contact licensing@velobpa.com.

This n8n community node provides seamless integration with Fetch.ai's decentralized AI ecosystem. Access 5 key resources including Agent management, Function execution, Almanac data retrieval, Message handling, and Wallet operations to build sophisticated AI-powered automation workflows.

![n8n Community Node](https://img.shields.io/badge/n8n-Community%20Node-blue)
![License](https://img.shields.io/badge/license-BSL--1.1-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue)
![Fetch.ai](https://img.shields.io/badge/Fetch.ai-Compatible-purple)
![AI Agents](https://img.shields.io/badge/AI%20Agents-Ready-green)
![Blockchain](https://img.shields.io/badge/Blockchain-Enabled-orange)

## Features

- **Agent Management** - Create, deploy, and manage autonomous AI agents on Fetch.ai network
- **Function Execution** - Execute smart functions and microservices within the Fetch.ai ecosystem
- **Almanac Integration** - Access and query Fetch.ai's decentralized knowledge registry
- **Message Handling** - Send and receive messages between agents and services
- **Wallet Operations** - Manage FET tokens, transactions, and blockchain interactions
- **Multi-Environment Support** - Works with testnet and mainnet Fetch.ai deployments
- **Real-time Monitoring** - Track agent performance and transaction status
- **Secure Authentication** - API key-based authentication with encrypted connections

## Installation

### Community Nodes (Recommended)

1. Open n8n
2. Go to **Settings** → **Community Nodes**
3. Click **Install a community node**
4. Enter `n8n-nodes-fetch-ai`
5. Click **Install**

### Manual Installation

```bash
cd ~/.n8n
npm install n8n-nodes-fetch-ai
```

### Development Installation

```bash
git clone https://github.com/Velocity-BPA/n8n-nodes-fetch-ai.git
cd n8n-nodes-fetch-ai
npm install
npm run build
mkdir -p ~/.n8n/custom
ln -s $(pwd) ~/.n8n/custom/n8n-nodes-fetch-ai
n8n start
```

## Credentials Setup

| Field | Description | Required |
|-------|-------------|----------|
| API Key | Your Fetch.ai API authentication key | Yes |
| Environment | Target environment (testnet/mainnet) | Yes |
| Base URL | Custom API endpoint URL (optional) | No |

## Resources & Operations

### 1. Agent

| Operation | Description |
|-----------|-------------|
| Create | Deploy a new autonomous AI agent |
| Get | Retrieve agent details and status |
| List | List all agents in your account |
| Update | Modify agent configuration and parameters |
| Delete | Remove an agent from the network |
| Start | Activate an agent for operation |
| Stop | Pause agent execution |

### 2. Function

| Operation | Description |
|-----------|-------------|
| Execute | Run a specific function or microservice |
| Register | Register a new function in the network |
| Get | Retrieve function details and metadata |
| List | List available functions |
| Update | Modify function parameters or code |
| Delete | Remove a function from the registry |

### 3. Almanac

| Operation | Description |
|-----------|-------------|
| Query | Search and retrieve data from Almanac |
| Register | Add new data entries to Almanac |
| Get | Fetch specific Almanac records |
| List | Browse available Almanac entries |
| Update | Modify existing Almanac data |
| Delete | Remove entries from Almanac |

### 4. Message

| Operation | Description |
|-----------|-------------|
| Send | Send messages to agents or services |
| Receive | Retrieve incoming messages |
| List | List message history |
| Get | Fetch specific message details |
| Delete | Remove messages from queue |
| Subscribe | Set up message subscriptions |

### 5. Wallet

| Operation | Description |
|-----------|-------------|
| Get Balance | Check FET token balance |
| Send Transaction | Transfer FET tokens |
| Get Transaction | Retrieve transaction details |
| List Transactions | View transaction history |
| Create Address | Generate new wallet addresses |
| Sign Message | Cryptographically sign messages |

## Usage Examples

```javascript
// Create and deploy an AI agent
{
  "name": "DataAnalysisAgent",
  "description": "Analyzes market data and provides insights",
  "code": "def analyze_data(data): return {'trend': 'bullish', 'confidence': 0.85}",
  "resources": ["cpu:1", "memory:512mb"]
}
```

```javascript
// Execute a function with parameters
{
  "function_id": "data-processor-v1",
  "parameters": {
    "input_data": "{{$json.market_data}}",
    "analysis_type": "trend_analysis"
  },
  "timeout": 30
}
```

```javascript
// Query Almanac for market data
{
  "query": "SELECT * FROM market_data WHERE symbol='FET' AND timestamp > now() - interval '1 hour'",
  "limit": 100,
  "format": "json"
}
```

```javascript
// Send FET tokens between wallets
{
  "to_address": "fetch1abc123def456ghi789jkl012mno345pqr678stu",
  "amount": "100.5",
  "memo": "Payment for AI services"
}
```

## Error Handling

| Error | Description | Solution |
|-------|-------------|----------|
| Invalid API Key | Authentication failed with provided credentials | Verify API key in credentials configuration |
| Agent Not Found | Specified agent ID does not exist | Check agent ID and ensure agent exists |
| Insufficient Funds | Wallet balance too low for transaction | Add more FET tokens to wallet |
| Network Timeout | Request timed out waiting for response | Check network connectivity and retry |
| Rate Limit Exceeded | Too many requests sent in time period | Implement request throttling or wait before retry |
| Function Execution Failed | Error occurred during function runtime | Review function logs and input parameters |

## Development

```bash
npm install
npm run build
npm test
npm run lint
npm run dev
```

## Author

**Velocity BPA**
- Website: [velobpa.com](https://velobpa.com)
- GitHub: [Velocity-BPA](https://github.com/Velocity-BPA)

## Licensing

This n8n community node is licensed under the **Business Source License 1.1**.

### Free Use
Permitted for personal, educational, research, and internal business use.

### Commercial Use
Use of this node within any SaaS, PaaS, hosted platform, managed service, or paid automation offering requires a commercial license.

For licensing inquiries: **licensing@velobpa.com**

See [LICENSE](LICENSE), [COMMERCIAL_LICENSE.md](COMMERCIAL_LICENSE.md), and [LICENSING_FAQ.md](LICENSING_FAQ.md) for details.

## Contributing

Contributions are welcome! Please ensure:

1. Code follows existing style conventions
2. All tests pass (`npm test`)
3. Linting passes (`npm run lint`)
4. Documentation is updated for new features
5. Commit messages are descriptive

## Support

- **Issues**: [GitHub Issues](https://github.com/Velocity-BPA/n8n-nodes-fetch-ai/issues)
- **Fetch.ai Documentation**: [docs.fetch.ai](https://docs.fetch.ai)
- **Fetch.ai Developer Community**: [developer.fetch.ai](https://developer.fetch.ai)