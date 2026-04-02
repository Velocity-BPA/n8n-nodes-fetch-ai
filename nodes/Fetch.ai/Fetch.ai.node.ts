/**
 * Copyright (c) 2026 Velocity BPA
 * 
 * Licensed under the Business Source License 1.1 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * 
 *     https://github.com/VelocityBPA/n8n-nodes-fetchai/blob/main/LICENSE
 * 
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import {
  IExecuteFunctions,
  INodeExecutionData,
  INodeType,
  INodeTypeDescription,
  NodeOperationError,
  NodeApiError,
} from 'n8n-workflow';

export class Fetchai implements INodeType {
  description: INodeTypeDescription = {
    displayName: 'Fetch.ai',
    name: 'fetchai',
    icon: 'file:fetchai.svg',
    group: ['transform'],
    version: 1,
    subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
    description: 'Interact with the Fetch.ai API',
    defaults: {
      name: 'Fetch.ai',
    },
    inputs: ['main'],
    outputs: ['main'],
    credentials: [
      {
        name: 'fetchaiApi',
        required: true,
      },
    ],
    properties: [
      {
        displayName: 'Resource',
        name: 'resource',
        type: 'options',
        noDataExpression: true,
        options: [
          {
            name: 'Agent',
            value: 'agent',
          },
          {
            name: 'Function',
            value: 'function',
          },
          {
            name: 'Almanac',
            value: 'almanac',
          },
          {
            name: 'Message',
            value: 'message',
          },
          {
            name: 'Wallet',
            value: 'wallet',
          }
        ],
        default: 'agent',
      },
{
  displayName: 'Operation',
  name: 'operation',
  type: 'options',
  noDataExpression: true,
  displayOptions: { show: { resource: ['agent'] } },
  options: [
    { name: 'List Agents', value: 'listAgents', description: 'Get all agents for the authenticated user', action: 'List agents' },
    { name: 'Create Agent', value: 'createAgent', description: 'Create a new AI agent', action: 'Create agent' },
    { name: 'Get Agent', value: 'getAgent', description: 'Get details of a specific agent', action: 'Get agent' },
    { name: 'Update Agent', value: 'updateAgent', description: 'Update agent configuration and code', action: 'Update agent' },
    { name: 'Delete Agent', value: 'deleteAgent', description: 'Delete an agent', action: 'Delete agent' },
    { name: 'Start Agent', value: 'startAgent', description: 'Start an agent instance', action: 'Start agent' },
    { name: 'Stop Agent', value: 'stopAgent', description: 'Stop a running agent', action: 'Stop agent' },
  ],
  default: 'listAgents',
},
{
	displayName: 'Operation',
	name: 'operation',
	type: 'options',
	noDataExpression: true,
	displayOptions: {
		show: {
			resource: ['function'],
		},
	},
	options: [
		{
			name: 'List Functions',
			value: 'listFunctions',
			description: 'Get all available functions',
			action: 'List functions',
		},
		{
			name: 'Create Function',
			value: 'createFunction',
			description: 'Register a new function for an agent',
			action: 'Create function',
		},
		{
			name: 'Get Function',
			value: 'getFunction',
			description: 'Get details of a specific function',
			action: 'Get function',
		},
		{
			name: 'Update Function',
			value: 'updateFunction',
			description: 'Update function definition',
			action: 'Update function',
		},
		{
			name: 'Delete Function',
			value: 'deleteFunction',
			description: 'Unregister a function',
			action: 'Delete function',
		},
	],
	default: 'listFunctions',
},
{
	displayName: 'Operation',
	name: 'operation',
	type: 'options',
	noDataExpression: true,
	displayOptions: {
		show: {
			resource: ['almanac'],
		},
	},
	options: [
		{
			name: 'Search Agents',
			value: 'searchAgents',
			description: 'Search for agents by capabilities',
			action: 'Search agents',
		},
		{
			name: 'Register Service',
			value: 'registerService',
			description: 'Register agent service in Almanac',
			action: 'Register service',
		},
		{
			name: 'Get Services',
			value: 'getServices',
			description: 'Get registered services',
			action: 'Get services',
		},
		{
			name: 'Update Service',
			value: 'updateService',
			description: 'Update service registration',
			action: 'Update service',
		},
		{
			name: 'Unregister Service',
			value: 'unregisterService',
			description: 'Remove service from Almanac',
			action: 'Unregister service',
		},
	],
	default: 'searchAgents',
},
{
	displayName: 'Operation',
	name: 'operation',
	type: 'options',
	noDataExpression: true,
	displayOptions: {
		show: {
			resource: ['message'],
		},
	},
	options: [
		{
			name: 'Get Messages',
			value: 'getMessages',
			description: 'Get messages for an agent',
			action: 'Get messages',
		},
		{
			name: 'Send Message',
			value: 'sendMessage',
			description: 'Send message to another agent',
			action: 'Send message',
		},
		{
			name: 'Get Message',
			value: 'getMessage',
			description: 'Get specific message details',
			action: 'Get message',
		},
		{
			name: 'Update Message',
			value: 'updateMessage',
			description: 'Update message status',
			action: 'Update message',
		},
		{
			name: 'Delete Message',
			value: 'deleteMessage',
			description: 'Delete a message',
			action: 'Delete message',
		},
	],
	default: 'getMessages',
},
{
	displayName: 'Operation',
	name: 'operation',
	type: 'options',
	noDataExpression: true,
	displayOptions: {
		show: {
			resource: ['wallet'],
		},
	},
	options: [
		{
			name: 'Get Wallets',
			value: 'getWallets',
			description: 'Get wallets associated with agents',
			action: 'Get wallets',
		},
		{
			name: 'Create Wallet',
			value: 'createWallet',
			description: 'Create a new wallet for an agent',
			action: 'Create wallet',
		},
		{
			name: 'Get Wallet',
			value: 'getWallet',
			description: 'Get wallet details and balance',
			action: 'Get wallet',
		},
		{
			name: 'Get Balance',
			value: 'getBalance',
			description: 'Get wallet FET balance',
			action: 'Get balance',
		},
		{
			name: 'Transfer Tokens',
			value: 'transferTokens',
			description: 'Transfer FET tokens',
			action: 'Transfer tokens',
		},
		{
			name: 'Get Transactions',
			value: 'getTransactions',
			description: 'Get wallet transaction history',
			action: 'Get transactions',
		},
	],
	default: 'getWallets',
},
{
  displayName: 'Limit',
  name: 'limit',
  type: 'number',
  default: 50,
  description: 'Maximum number of agents to return',
  displayOptions: { show: { resource: ['agent'], operation: ['listAgents'] } },
},
{
  displayName: 'Offset',
  name: 'offset',
  type: 'number',
  default: 0,
  description: 'Number of agents to skip',
  displayOptions: { show: { resource: ['agent'], operation: ['listAgents'] } },
},
{
  displayName: 'Status',
  name: 'status',
  type: 'options',
  options: [
    { name: 'All', value: '' },
    { name: 'Active', value: 'active' },
    { name: 'Inactive', value: 'inactive' },
    { name: 'Running', value: 'running' },
    { name: 'Stopped', value: 'stopped' },
  ],
  default: '',
  description: 'Filter agents by status',
  displayOptions: { show: { resource: ['agent'], operation: ['listAgents'] } },
},
{
  displayName: 'Name',
  name: 'name',
  type: 'string',
  required: true,
  default: '',
  description: 'Name of the agent',
  displayOptions: { show: { resource: ['agent'], operation: ['createAgent', 'updateAgent'] } },
},
{
  displayName: 'Description',
  name: 'description',
  type: 'string',
  default: '',
  description: 'Description of the agent',
  displayOptions: { show: { resource: ['agent'], operation: ['createAgent', 'updateAgent'] } },
},
{
  displayName: 'Code',
  name: 'code',
  type: 'string',
  typeOptions: {
    rows: 10,
  },
  required: true,
  default: '',
  description: 'Python code for the agent',
  displayOptions: { show: { resource: ['agent'], operation: ['createAgent', 'updateAgent'] } },
},
{
  displayName: 'Mailbox Key',
  name: 'mailbox_key',
  type: 'string',
  default: '',
  description: 'Mailbox key for agent communication',
  displayOptions: { show: { resource: ['agent'], operation: ['createAgent'] } },
},
{
  displayName: 'Agent ID',
  name: 'agent_id',
  type: 'string',
  required: true,
  default: '',
  description: 'The ID of the agent',
  displayOptions: { show: { resource: ['agent'], operation: ['getAgent', 'updateAgent', 'deleteAgent', 'startAgent', 'stopAgent'] } },
},
{
	displayName: 'Agent ID',
	name: 'agentId',
	type: 'string',
	required: true,
	displayOptions: {
		show: {
			resource: ['function'],
			operation: ['listFunctions', 'createFunction'],
		},
	},
	default: '',
	placeholder: 'agent1q...',
	description: 'The agent address in the required format (agent1q...)',
},
{
	displayName: 'Limit',
	name: 'limit',
	type: 'number',
	displayOptions: {
		show: {
			resource: ['function'],
			operation: ['listFunctions'],
		},
	},
	default: 10,
	description: 'Maximum number of functions to return',
},
{
	displayName: 'Offset',
	name: 'offset',
	type: 'number',
	displayOptions: {
		show: {
			resource: ['function'],
			operation: ['listFunctions'],
		},
	},
	default: 0,
	description: 'Number of functions to skip',
},
{
	displayName: 'Function ID',
	name: 'functionId',
	type: 'string',
	required: true,
	displayOptions: {
		show: {
			resource: ['function'],
			operation: ['getFunction', 'updateFunction', 'deleteFunction'],
		},
	},
	default: '',
	description: 'The unique identifier of the function',
},
{
	displayName: 'Function Name',
	name: 'name',
	type: 'string',
	required: true,
	displayOptions: {
		show: {
			resource: ['function'],
			operation: ['createFunction', 'updateFunction'],
		},
	},
	default: '',
	description: 'Name of the function',
},
{
	displayName: 'Description',
	name: 'description',
	type: 'string',
	displayOptions: {
		show: {
			resource: ['function'],
			operation: ['createFunction', 'updateFunction'],
		},
	},
	default: '',
	description: 'Description of what the function does',
},
{
	displayName: 'Schema',
	name: 'schema',
	type: 'json',
	displayOptions: {
		show: {
			resource: ['function'],
			operation: ['createFunction', 'updateFunction'],
		},
	},
	default: '{}',
	description: 'JSON schema defining the function parameters and return type',
},
{
	displayName: 'Query',
	name: 'query',
	type: 'string',
	displayOptions: {
		show: {
			resource: ['almanac'],
			operation: ['searchAgents'],
		},
	},
	default: '',
	description: 'Search query for agent capabilities',
},
{
	displayName: 'Protocols',
	name: 'protocols',
	type: 'string',
	displayOptions: {
		show: {
			resource: ['almanac'],
			operation: ['searchAgents'],
		},
	},
	default: '',
	description: 'Comma-separated list of protocols to filter by',
},
{
	displayName: 'Limit',
	name: 'limit',
	type: 'number',
	displayOptions: {
		show: {
			resource: ['almanac'],
			operation: ['searchAgents', 'getServices'],
		},
	},
	default: 10,
	description: 'Maximum number of results to return',
},
{
	displayName: 'Offset',
	name: 'offset',
	type: 'number',
	displayOptions: {
		show: {
			resource: ['almanac'],
			operation: ['searchAgents', 'getServices'],
		},
	},
	default: 0,
	description: 'Number of results to skip',
},
{
	displayName: 'Agent Address',
	name: 'agentAddress',
	type: 'string',
	required: true,
	displayOptions: {
		show: {
			resource: ['almanac'],
			operation: ['registerService'],
		},
	},
	default: '',
	description: 'Agent address in format agent1q...',
	placeholder: 'agent1q...',
},
{
	displayName: 'Service Type',
	name: 'serviceType',
	type: 'string',
	required: true,
	displayOptions: {
		show: {
			resource: ['almanac'],
			operation: ['registerService'],
		},
	},
	default: '',
	description: 'Type of service being registered',
},
{
	displayName: 'Service Type Filter',
	name: 'serviceType',
	type: 'string',
	displayOptions: {
		show: {
			resource: ['almanac'],
			operation: ['getServices'],
		},
	},
	default: '',
	description: 'Filter services by type',
},
{
	displayName: 'Agent Address Filter',
	name: 'agentAddress',
	type: 'string',
	displayOptions: {
		show: {
			resource: ['almanac'],
			operation: ['getServices'],
		},
	},
	default: '',
	description: 'Filter services by agent address',
},
{
	displayName: 'Endpoints',
	name: 'endpoints',
	type: 'json',
	required: true,
	displayOptions: {
		show: {
			resource: ['almanac'],
			operation: ['registerService', 'updateService'],
		},
	},
	default: '{}',
	description: 'Service endpoints configuration as JSON',
},
{
	displayName: 'Metadata',
	name: 'metadata',
	type: 'json',
	displayOptions: {
		show: {
			resource: ['almanac'],
			operation: ['registerService', 'updateService'],
		},
	},
	default: '{}',
	description: 'Additional metadata for the service as JSON',
},
{
	displayName: 'Service ID',
	name: 'serviceId',
	type: 'string',
	required: true,
	displayOptions: {
		show: {
			resource: ['almanac'],
			operation: ['updateService', 'unregisterService'],
		},
	},
	default: '',
	description: 'ID of the service to update or unregister',
},
{
	displayName: 'Agent ID',
	name: 'agentId',
	type: 'string',
	required: true,
	displayOptions: {
		show: {
			resource: ['message'],
			operation: ['getMessages'],
		},
	},
	default: '',
	description: 'The agent ID to get messages for',
},
{
	displayName: 'Limit',
	name: 'limit',
	type: 'number',
	displayOptions: {
		show: {
			resource: ['message'],
			operation: ['getMessages'],
		},
	},
	default: 50,
	description: 'Maximum number of messages to return',
},
{
	displayName: 'Offset',
	name: 'offset',
	type: 'number',
	displayOptions: {
		show: {
			resource: ['message'],
			operation: ['getMessages'],
		},
	},
	default: 0,
	description: 'Number of messages to skip',
},
{
	displayName: 'Status',
	name: 'status',
	type: 'options',
	displayOptions: {
		show: {
			resource: ['message'],
			operation: ['getMessages'],
		},
	},
	options: [
		{
			name: 'All',
			value: '',
		},
		{
			name: 'Pending',
			value: 'pending',
		},
		{
			name: 'Delivered',
			value: 'delivered',
		},
		{
			name: 'Failed',
			value: 'failed',
		},
	],
	default: '',
	description: 'Filter messages by status',
},
{
	displayName: 'Sender Address',
	name: 'senderAddress',
	type: 'string',
	required: true,
	displayOptions: {
		show: {
			resource: ['message'],
			operation: ['sendMessage'],
		},
	},
	default: '',
	description: 'The sender agent address (agent1q... format)',
	placeholder: 'agent1q...',
},
{
	displayName: 'Target Address',
	name: 'targetAddress',
	type: 'string',
	required: true,
	displayOptions: {
		show: {
			resource: ['message'],
			operation: ['sendMessage'],
		},
	},
	default: '',
	description: 'The target agent address (agent1q... format)',
	placeholder: 'agent1q...',
},
{
	displayName: 'Message Type',
	name: 'messageType',
	type: 'string',
	required: true,
	displayOptions: {
		show: {
			resource: ['message'],
			operation: ['sendMessage'],
		},
	},
	default: '',
	description: 'Type of the message being sent',
},
{
	displayName: 'Payload',
	name: 'payload',
	type: 'json',
	required: true,
	displayOptions: {
		show: {
			resource: ['message'],
			operation: ['sendMessage'],
		},
	},
	default: '{}',
	description: 'Message payload as JSON object',
},
{
	displayName: 'Message ID',
	name: 'messageId',
	type: 'string',
	required: true,
	displayOptions: {
		show: {
			resource: ['message'],
			operation: ['getMessage', 'updateMessage', 'deleteMessage'],
		},
	},
	default: '',
	description: 'The unique identifier of the message',
},
{
	displayName: 'Status',
	name: 'messageStatus',
	type: 'options',
	required: true,
	displayOptions: {
		show: {
			resource: ['message'],
			operation: ['updateMessage'],
		},
	},
	options: [
		{
			name: 'Pending',
			value: 'pending',
		},
		{
			name: 'Delivered',
			value: 'delivered',
		},
		{
			name: 'Failed',
			value: 'failed',
		},
		{
			name: 'Read',
			value: 'read',
		},
	],
	default: 'delivered',
	description: 'New status for the message',
},
{
	displayName: 'Agent ID',
	name: 'agentId',
	type: 'string',
	required: true,
	displayOptions: {
		show: {
			resource: ['wallet'],
			operation: ['getWallets', 'createWallet'],
		},
	},
	default: '',
	placeholder: 'agent1q...',
	description: 'The agent ID to get wallets for or create wallet for',
},
{
	displayName: 'Wallet Name',
	name: 'walletName',
	type: 'string',
	required: true,
	displayOptions: {
		show: {
			resource: ['wallet'],
			operation: ['createWallet'],
		},
	},
	default: '',
	description: 'The name of the wallet to create',
},
{
	displayName: 'Wallet ID',
	name: 'walletId',
	type: 'string',
	required: true,
	displayOptions: {
		show: {
			resource: ['wallet'],
			operation: ['getWallet', 'getBalance', 'transferTokens', 'getTransactions'],
		},
	},
	default: '',
	description: 'The wallet ID',
},
{
	displayName: 'To Address',
	name: 'toAddress',
	type: 'string',
	required: true,
	displayOptions: {
		show: {
			resource: ['wallet'],
			operation: ['transferTokens'],
		},
	},
	default: '',
	placeholder: 'agent1q...',
	description: 'The destination address to transfer tokens to',
},
{
	displayName: 'Amount',
	name: 'amount',
	type: 'string',
	required: true,
	displayOptions: {
		show: {
			resource: ['wallet'],
			operation: ['transferTokens'],
		},
	},
	default: '',
	description: 'The amount of FET tokens to transfer',
},
{
	displayName: 'Limit',
	name: 'limit',
	type: 'number',
	displayOptions: {
		show: {
			resource: ['wallet'],
			operation: ['getWallets', 'getTransactions'],
		},
	},
	default: 20,
	description: 'Maximum number of results to return',
},
{
	displayName: 'Offset',
	name: 'offset',
	type: 'number',
	displayOptions: {
		show: {
			resource: ['wallet'],
			operation: ['getWallets', 'getTransactions'],
		},
	},
	default: 0,
	description: 'Number of results to skip',
},
    ],
  };

  async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
    const items = this.getInputData();
    const resource = this.getNodeParameter('resource', 0) as string;

    switch (resource) {
      case 'agent':
        return [await executeAgentOperations.call(this, items)];
      case 'function':
        return [await executeFunctionOperations.call(this, items)];
      case 'almanac':
        return [await executeAlmanacOperations.call(this, items)];
      case 'message':
        return [await executeMessageOperations.call(this, items)];
      case 'wallet':
        return [await executeWalletOperations.call(this, items)];
      default:
        throw new NodeOperationError(this.getNode(), `The resource "${resource}" is not supported`);
    }
  }
}

// ============================================================
// Resource Handler Functions
// ============================================================

async function executeAgentOperations(
  this: IExecuteFunctions,
  items: INodeExecutionData[],
): Promise<INodeExecutionData[]> {
  const returnData: INodeExecutionData[] = [];
  const operation = this.getNodeParameter('operation', 0) as string;
  const credentials = await this.getCredentials('fetchaiApi') as any;

  for (let i = 0; i < items.length; i++) {
    try {
      let result: any;

      switch (operation) {
        case 'listAgents': {
          const limit = this.getNodeParameter('limit', i) as number;
          const offset = this.getNodeParameter('offset', i) as number;
          const status = this.getNodeParameter('status', i) as string;

          const queryParams: any = {
            limit: limit.toString(),
            offset: offset.toString(),
          };
          if (status) {
            queryParams.status = status;
          }

          const queryString = new URLSearchParams(queryParams).toString();
          
          const options: any = {
            method: 'GET',
            url: `${credentials.baseUrl}/agents?${queryString}`,
            headers: {
              'Authorization': `Bearer ${credentials.apiKey}`,
              'Content-Type': 'application/json',
            },
            json: true,
          };

          result = await this.helpers.httpRequest(options) as any;
          break;
        }

        case 'createAgent': {
          const name = this.getNodeParameter('name', i) as string;
          const description = this.getNodeParameter('description', i) as string;
          const code = this.getNodeParameter('code', i) as string;
          const mailbox_key = this.getNodeParameter('mailbox_key', i) as string;

          const body: any = {
            name,
            description,
            code,
          };
          if (mailbox_key) {
            body.mailbox_key = mailbox_key;
          }

          const options: any = {
            method: 'POST',
            url: `${credentials.baseUrl}/agents`,
            headers: {
              'Authorization': `Bearer ${credentials.apiKey}`,
              'Content-Type': 'application/json',
            },
            body,
            json: true,
          };

          result = await this.helpers.httpRequest(options) as any;
          break;
        }

        case 'getAgent': {
          const agent_id = this.getNodeParameter('agent_id', i) as string;

          const options: any = {
            method: 'GET',
            url: `${credentials.baseUrl}/agents/${agent_id}`,
            headers: {
              'Authorization': `Bearer ${credentials.apiKey}`,
              'Content-Type': 'application/json',
            },
            json: true,
          };

          result = await this.helpers.httpRequest(options) as any;
          break;
        }

        case 'updateAgent': {
          const agent_id = this.getNodeParameter('agent_id', i) as string;
          const name = this.getNodeParameter('name', i) as string;
          const description = this.getNodeParameter('description', i) as string;
          const code = this.getNodeParameter('code', i) as string;

          const body: any = {
            name,
            description,
            code,
          };

          const options: any = {
            method: 'PUT',
            url: `${credentials.baseUrl}/agents/${agent_id}`,
            headers: {
              'Authorization': `Bearer ${credentials.apiKey}`,
              'Content-Type': 'application/json',
            },
            body,
            json: true,
          };

          result = await this.helpers.httpRequest(options) as any;
          break;
        }

        case 'deleteAgent': {
          const agent_id = this.getNodeParameter('agent_id', i) as string;

          const options: any = {
            method: 'DELETE',
            url: `${credentials.baseUrl}/agents/${agent_id}`,
            headers: {
              'Authorization': `Bearer ${credentials.apiKey}`,
              'Content-Type': 'application/json',
            },
            json: true,
          };

          result = await this.helpers.httpRequest(options) as any;
          break;
        }

        case 'startAgent': {
          const agent_id = this.getNodeParameter('agent_id', i) as string;

          const options: any = {
            method: 'POST',
            url: `${credentials.baseUrl}/agents/${agent_id}/start`,
            headers: {
              'Authorization': `Bearer ${credentials.apiKey}`,
              'Content-Type': 'application/json',
            },
            json: true,
          };

          result = await this.helpers.httpRequest(options) as any;
          break;
        }

        case 'stopAgent': {
          const agent_id = this.getNodeParameter('agent_id', i) as string;

          const options: any = {
            method: 'POST',
            url: `${credentials.baseUrl}/agents/${agent_id}/stop`,
            headers: {
              'Authorization': `Bearer ${credentials.apiKey}`,
              'Content-Type': 'application/json',
            },
            json: true,
          };

          result = await this.helpers.httpRequest(options) as any;
          break;
        }

        default:
          throw new NodeOperationError(this.getNode(), `Unknown operation: ${operation}`);
      }

      returnData.push({ json: result, pairedItem: { item: i } });
    } catch (error: any) {
      if (this.continueOnFail()) {
        returnData.push({ json: { error: error.message }, pairedItem: { item: i } });
      } else {
        throw error;
      }
    }
  }

  return returnData;
}

async function executeFunctionOperations(
	this: IExecuteFunctions,
	items: INodeExecutionData[],
): Promise<INodeExecutionData[]> {
	const returnData: INodeExecutionData[] = [];
	const operation = this.getNodeParameter('operation', 0) as string;
	const credentials = await this.getCredentials('fetchaiApi') as any;

	for (let i = 0; i < items.length; i++) {
		try {
			let result: any;

			switch (operation) {
				case 'listFunctions': {
					const agentId = this.getNodeParameter('agentId', i) as string;
					const limit = this.getNodeParameter('limit', i, 10) as number;
					const offset = this.getNodeParameter('offset', i, 0) as number;

					const options: any = {
						method: 'GET',
						url: `${credentials.baseUrl}/functions`,
						headers: {
							'Authorization': `Bearer ${credentials.apiKey}`,
							'Content-Type': 'application/json',
						},
						qs: {
							agent_id: agentId,
							limit,
							offset,
						},
						json: true,
					};

					result = await this.helpers.httpRequest(options) as any;
					break;
				}

				case 'createFunction': {
					const agentId = this.getNodeParameter('agentId', i) as string;
					const name = this.getNodeParameter('name', i) as string;
					const description = this.getNodeParameter('description', i, '') as string;
					const schema = this.getNodeParameter('schema', i, '{}') as string;

					let parsedSchema: any = {};
					try {
						parsedSchema = typeof schema === 'string' ? JSON.parse(schema) : schema;
					} catch (error: any) {
						throw new NodeOperationError(this.getNode(), `Invalid JSON schema: ${error.message}`);
					}

					const options: any = {
						method: 'POST',
						url: `${credentials.baseUrl}/functions`,
						headers: {
							'Authorization': `Bearer ${credentials.apiKey}`,
							'Content-Type': 'application/json',
						},
						body: {
							agent_id: agentId,
							name,
							description,
							schema: parsedSchema,
						},
						json: true,
					};

					result = await this.helpers.httpRequest(options) as any;
					break;
				}

				case 'getFunction': {
					const functionId = this.getNodeParameter('functionId', i) as string;

					const options: any = {
						method: 'GET',
						url: `${credentials.baseUrl}/functions/${functionId}`,
						headers: {
							'Authorization': `Bearer ${credentials.apiKey}`,
							'Content-Type': 'application/json',
						},
						json: true,
					};

					result = await this.helpers.httpRequest(options) as any;
					break;
				}

				case 'updateFunction': {
					const functionId = this.getNodeParameter('functionId', i) as string;
					const name = this.getNodeParameter('name', i) as string;
					const description = this.getNodeParameter('description', i, '') as string;
					const schema = this.getNodeParameter('schema', i, '{}') as string;

					let parsedSchema: any = {};
					try {
						parsedSchema = typeof schema === 'string' ? JSON.parse(schema) : schema;
					} catch (error: any) {
						throw new NodeOperationError(this.getNode(), `Invalid JSON schema: ${error.message}`);
					}

					const options: any = {
						method: 'PUT',
						url: `${credentials.baseUrl}/functions/${functionId}`,
						headers: {
							'Authorization': `Bearer ${credentials.apiKey}`,
							'Content-Type': 'application/json',
						},
						body: {
							name,
							description,
							schema: parsedSchema,
						},
						json: true,
					};

					result = await this.helpers.httpRequest(options) as any;
					break;
				}

				case 'deleteFunction': {
					const functionId = this.getNodeParameter('functionId', i) as string;

					const options: any = {
						method: 'DELETE',
						url: `${credentials.baseUrl}/functions/${functionId}`,
						headers: {
							'Authorization': `Bearer ${credentials.apiKey}`,
							'Content-Type': 'application/json',
						},
						json: true,
					};

					result = await this.helpers.httpRequest(options) as any;
					break;
				}

				default:
					throw new NodeOperationError(this.getNode(), `Unknown operation: ${operation}`);
			}

			returnData.push({
				json: result,
				pairedItem: { item: i },
			});

		} catch (error: any) {
			if (this.continueOnFail()) {
				returnData.push({
					json: { error: error.message },
					pairedItem: { item: i },
				});
			} else {
				throw error;
			}
		}
	}

	return returnData;
}

async function executeAlmanacOperations(
	this: IExecuteFunctions,
	items: INodeExecutionData[],
): Promise<INodeExecutionData[]> {
	const returnData: INodeExecutionData[] = [];
	const operation = this.getNodeParameter('operation', 0) as string;
	const credentials = await this.getCredentials('fetchaiApi') as any;

	for (let i = 0; i < items.length; i++) {
		try {
			let result: any;

			switch (operation) {
				case 'searchAgents': {
					const query = this.getNodeParameter('query', i) as string;
					const protocols = this.getNodeParameter('protocols', i) as string;
					const limit = this.getNodeParameter('limit', i) as number;
					const offset = this.getNodeParameter('offset', i) as number;

					const params = new URLSearchParams();
					if (query) params.append('query', query);
					if (protocols) params.append('protocols', protocols);
					if (limit) params.append('limit', limit.toString());
					if (offset) params.append('offset', offset.toString());

					const options: any = {
						method: 'GET',
						url: `${credentials.baseUrl}/almanac/agents?${params.toString()}`,
						headers: {
							'Authorization': `Bearer ${credentials.apiKey}`,
							'Content-Type': 'application/json',
						},
						json: true,
					};

					result = await this.helpers.httpRequest(options) as any;
					break;
				}

				case 'registerService': {
					const agentAddress = this.getNodeParameter('agentAddress', i) as string;
					const serviceType = this.getNodeParameter('serviceType', i) as string;
					const endpoints = this.getNodeParameter('endpoints', i) as string;
					const metadata = this.getNodeParameter('metadata', i) as string;

					let endpointsObj: any;
					let metadataObj: any;

					try {
						endpointsObj = JSON.parse(endpoints);
					} catch (error: any) {
						throw new NodeOperationError(this.getNode(), `Invalid JSON in endpoints: ${error.message}`);
					}

					try {
						metadataObj = metadata ? JSON.parse(metadata) : {};
					} catch (error: any) {
						throw new NodeOperationError(this.getNode(), `Invalid JSON in metadata: ${error.message}`);
					}

					const options: any = {
						method: 'POST',
						url: `${credentials.baseUrl}/almanac/register`,
						headers: {
							'Authorization': `Bearer ${credentials.apiKey}`,
							'Content-Type': 'application/json',
						},
						body: {
							agent_address: agentAddress,
							service_type: serviceType,
							endpoints: endpointsObj,
							metadata: metadataObj,
						},
						json: true,
					};

					result = await this.helpers.httpRequest(options) as any;
					break;
				}

				case 'getServices': {
					const serviceType = this.getNodeParameter('serviceType', i) as string;
					const agentAddress = this.getNodeParameter('agentAddress', i) as string;
					const limit = this.getNodeParameter('limit', i) as number;
					const offset = this.getNodeParameter('offset', i) as number;

					const params = new URLSearchParams();
					if (serviceType) params.append('service_type', serviceType);
					if (agentAddress) params.append('agent_address', agentAddress);
					if (limit) params.append('limit', limit.toString());
					if (offset) params.append('offset', offset.toString());

					const options: any = {
						method: 'GET',
						url: `${credentials.baseUrl}/almanac/services?${params.toString()}`,
						headers: {
							'Authorization': `Bearer ${credentials.apiKey}`,
							'Content-Type': 'application/json',
						},
						json: true,
					};

					result = await this.helpers.httpRequest(options) as any;
					break;
				}

				case 'updateService': {
					const serviceId = this.getNodeParameter('serviceId', i) as string;
					const endpoints = this.getNodeParameter('endpoints', i) as string;
					const metadata = this.getNodeParameter('metadata', i) as string;

					let endpointsObj: any;
					let metadataObj: any;

					try {
						endpointsObj = JSON.parse(endpoints);
					} catch (error: any) {
						throw new NodeOperationError(this.getNode(), `Invalid JSON in endpoints: ${error.message}`);
					}

					try {
						metadataObj = metadata ? JSON.parse(metadata) : {};
					} catch (error: any) {
						throw new NodeOperationError(this.getNode(), `Invalid JSON in metadata: ${error.message}`);
					}

					const options: any = {
						method: 'PUT',
						url: `${credentials.baseUrl}/almanac/services/${serviceId}`,
						headers: {
							'Authorization': `Bearer ${credentials.apiKey}`,
							'Content-Type': 'application/json',
						},
						body: {
							endpoints: endpointsObj,
							metadata: metadataObj,
						},
						json: true,
					};

					result = await this.helpers.httpRequest(options) as any;
					break;
				}

				case 'unregisterService': {
					const serviceId = this.getNodeParameter('serviceId', i) as string;

					const options: any = {
						method: 'DELETE',
						url: `${credentials.baseUrl}/almanac/services/${serviceId}`,
						headers: {
							'Authorization': `Bearer ${credentials.apiKey}`,
							'Content-Type': 'application/json',
						},
						json: true,
					};

					result = await this.helpers.httpRequest(options) as any;
					break;
				}

				default:
					throw new NodeOperationError(this.getNode(), `Unknown operation: ${operation}`);
			}

			returnData.push({
				json: result,
				pairedItem: { item: i },
			});

		} catch (error: any) {
			if (this.continueOnFail()) {
				returnData.push({
					json: { error: error.message },
					pairedItem: { item: i },
				});
			} else {
				throw error;
			}
		}
	}

	return returnData;
}

async function executeMessageOperations(
	this: IExecuteFunctions,
	items: INodeExecutionData[],
): Promise<INodeExecutionData[]> {
	const returnData: INodeExecutionData[] = [];
	const operation = this.getNodeParameter('operation', 0) as string;
	const credentials = await this.getCredentials('fetchaiApi') as any;

	for (let i = 0; i < items.length; i++) {
		try {
			let result: any;

			switch (operation) {
				case 'getMessages': {
					const agentId = this.getNodeParameter('agentId', i) as string;
					const limit = this.getNodeParameter('limit', i) as number;
					const offset = this.getNodeParameter('offset', i) as number;
					const status = this.getNodeParameter('status', i) as string;

					const qs: any = {
						agent_id: agentId,
						limit,
						offset,
					};

					if (status) {
						qs.status = status;
					}

					const options: any = {
						method: 'GET',
						url: `${credentials.baseUrl}/messages`,
						headers: {
							'Authorization': `Bearer ${credentials.apiKey}`,
							'Content-Type': 'application/json',
						},
						qs,
						json: true,
					};

					result = await this.helpers.httpRequest(options) as any;
					break;
				}

				case 'sendMessage': {
					const senderAddress = this.getNodeParameter('senderAddress', i) as string;
					const targetAddress = this.getNodeParameter('targetAddress', i) as string;
					const messageType = this.getNodeParameter('messageType', i) as string;
					const payload = this.getNodeParameter('payload', i) as object;

					const body = {
						sender_address: senderAddress,
						target_address: targetAddress,
						message_type: messageType,
						payload,
					};

					const options: any = {
						method: 'POST',
						url: `${credentials.baseUrl}/messages`,
						headers: {
							'Authorization': `Bearer ${credentials.apiKey}`,
							'Content-Type': 'application/json',
						},
						body,
						json: true,
					};

					result = await this.helpers.httpRequest(options) as any;
					break;
				}

				case 'getMessage': {
					const messageId = this.getNodeParameter('messageId', i) as string;

					const options: any = {
						method: 'GET',
						url: `${credentials.baseUrl}/messages/${messageId}`,
						headers: {
							'Authorization': `Bearer ${credentials.apiKey}`,
							'Content-Type': 'application/json',
						},
						json: true,
					};

					result = await this.helpers.httpRequest(options) as any;
					break;
				}

				case 'updateMessage': {
					const messageId = this.getNodeParameter('messageId', i) as string;
					const messageStatus = this.getNodeParameter('messageStatus', i) as string;

					const body = {
						status: messageStatus,
					};

					const options: any = {
						method: 'PUT',
						url: `${credentials.baseUrl}/messages/${messageId}`,
						headers: {
							'Authorization': `Bearer ${credentials.apiKey}`,
							'Content-Type': 'application/json',
						},
						body,
						json: true,
					};

					result = await this.helpers.httpRequest(options) as any;
					break;
				}

				case 'deleteMessage': {
					const messageId = this.getNodeParameter('messageId', i) as string;

					const options: any = {
						method: 'DELETE',
						url: `${credentials.baseUrl}/messages/${messageId}`,
						headers: {
							'Authorization': `Bearer ${credentials.apiKey}`,
							'Content-Type': 'application/json',
						},
						json: true,
					};

					result = await this.helpers.httpRequest(options) as any;
					break;
				}

				default:
					throw new NodeOperationError(this.getNode(), `Unknown operation: ${operation}`);
			}

			returnData.push({
				json: result,
				pairedItem: { item: i },
			});

		} catch (error: any) {
			if (this.continueOnFail()) {
				returnData.push({
					json: { error: error.message },
					pairedItem: { item: i },
				});
			} else {
				throw error;
			}
		}
	}

	return returnData;
}

async function executeWalletOperations(
	this: IExecuteFunctions,
	items: INodeExecutionData[],
): Promise<INodeExecutionData[]> {
	const returnData: INodeExecutionData[] = [];
	const operation = this.getNodeParameter('operation', 0) as string;
	const credentials = await this.getCredentials('fetchaiApi') as any;

	for (let i = 0; i < items.length; i++) {
		try {
			let result: any;

			switch (operation) {
				case 'getWallets': {
					const agentId = this.getNodeParameter('agentId', i) as string;
					const limit = this.getNodeParameter('limit', i) as number;
					const offset = this.getNodeParameter('offset', i) as number;

					const options: any = {
						method: 'GET',
						url: `${credentials.baseUrl}/wallets`,
						headers: {
							'Authorization': `Bearer ${credentials.apiKey}`,
							'Content-Type': 'application/json',
						},
						qs: {
							agent_id: agentId,
							limit,
							offset,
						},
						json: true,
					};

					result = await this.helpers.httpRequest(options) as any;
					break;
				}

				case 'createWallet': {
					const agentId = this.getNodeParameter('agentId', i) as string;
					const walletName = this.getNodeParameter('walletName', i) as string;

					const options: any = {
						method: 'POST',
						url: `${credentials.baseUrl}/wallets`,
						headers: {
							'Authorization': `Bearer ${credentials.apiKey}`,
							'Content-Type': 'application/json',
						},
						body: {
							agent_id: agentId,
							name: walletName,
						},
						json: true,
					};

					result = await this.helpers.httpRequest(options) as any;
					break;
				}

				case 'getWallet': {
					const walletId = this.getNodeParameter('walletId', i) as string;

					const options: any = {
						method: 'GET',
						url: `${credentials.baseUrl}/wallets/${walletId}`,
						headers: {
							'Authorization': `Bearer ${credentials.apiKey}`,
							'Content-Type': 'application/json',
						},
						json: true,
					};

					result = await this.helpers.httpRequest(options) as any;
					break;
				}

				case 'getBalance': {
					const walletId = this.getNodeParameter('walletId', i) as string;

					const options: any = {
						method: 'GET',
						url: `${credentials.baseUrl}/wallets/${walletId}/balance`,
						headers: {
							'Authorization': `Bearer ${credentials.apiKey}`,
							'Content-Type': 'application/json',
						},
						json: true,
					};

					result = await this.helpers.httpRequest(options) as any;
					break;
				}

				case 'transferTokens': {
					const walletId = this.getNodeParameter('walletId', i) as string;
					const toAddress = this.getNodeParameter('toAddress', i) as string;
					const amount = this.getNodeParameter('amount', i) as string;

					const options: any = {
						method: 'POST',
						url: `${credentials.baseUrl}/wallets/${walletId}/transfer`,
						headers: {
							'Authorization': `Bearer ${credentials.apiKey}`,
							'Content-Type': 'application/json',
						},
						body: {
							to_address: toAddress,
							amount: amount,
						},
						json: true,
					};

					result = await this.helpers.httpRequest(options) as any;
					break;
				}

				case 'getTransactions': {
					const walletId = this.getNodeParameter('walletId', i) as string;
					const limit = this.getNodeParameter('limit', i) as number;
					const offset = this.getNodeParameter('offset', i) as number;

					const options: any = {
						method: 'GET',
						url: `${credentials.baseUrl}/wallets/${walletId}/transactions`,
						headers: {
							'Authorization': `Bearer ${credentials.apiKey}`,
							'Content-Type': 'application/json',
						},
						qs: {
							limit,
							offset,
						},
						json: true,
					};

					result = await this.helpers.httpRequest(options) as any;
					break;
				}

				default:
					throw new NodeOperationError(this.getNode(), `Unknown operation: ${operation}`);
			}

			returnData.push({
				json: result,
				pairedItem: {
					item: i,
				},
			});
		} catch (error: any) {
			if (this.continueOnFail()) {
				returnData.push({
					json: {
						error: error.message,
					},
					pairedItem: {
						item: i,
					},
				});
			} else {
				throw error;
			}
		}
	}

	return returnData;
}
