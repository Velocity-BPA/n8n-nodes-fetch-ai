/**
 * Copyright (c) 2026 Velocity BPA
 * Licensed under the Business Source License 1.1
 */

import { IExecuteFunctions, INodeExecutionData } from 'n8n-workflow';
import { Fetchai } from '../nodes/Fetch.ai/Fetch.ai.node';

// Mock n8n-workflow
jest.mock('n8n-workflow', () => ({
  ...jest.requireActual('n8n-workflow'),
  NodeApiError: class NodeApiError extends Error {
    constructor(node: any, error: any) { super(error.message || 'API Error'); }
  },
  NodeOperationError: class NodeOperationError extends Error {
    constructor(node: any, message: string) { super(message); }
  },
}));

describe('Fetchai Node', () => {
  let node: Fetchai;

  beforeAll(() => {
    node = new Fetchai();
  });

  describe('Node Definition', () => {
    it('should have correct basic properties', () => {
      expect(node.description.displayName).toBe('Fetch.ai');
      expect(node.description.name).toBe('fetchai');
      expect(node.description.version).toBe(1);
      expect(node.description.inputs).toContain('main');
      expect(node.description.outputs).toContain('main');
    });

    it('should define 5 resources', () => {
      const resourceProp = node.description.properties.find(
        (p: any) => p.name === 'resource'
      );
      expect(resourceProp).toBeDefined();
      expect(resourceProp!.type).toBe('options');
      expect(resourceProp!.options).toHaveLength(5);
    });

    it('should have operation dropdowns for each resource', () => {
      const operations = node.description.properties.filter(
        (p: any) => p.name === 'operation'
      );
      expect(operations.length).toBe(5);
    });

    it('should require credentials', () => {
      expect(node.description.credentials).toBeDefined();
      expect(node.description.credentials!.length).toBeGreaterThan(0);
      expect(node.description.credentials![0].required).toBe(true);
    });

    it('should have parameters with proper displayOptions', () => {
      const params = node.description.properties.filter(
        (p: any) => p.displayOptions?.show?.resource
      );
      for (const param of params) {
        expect(param.displayOptions.show.resource).toBeDefined();
        expect(Array.isArray(param.displayOptions.show.resource)).toBe(true);
      }
    });
  });

  // Resource-specific tests
describe('Agent Resource', () => {
  let mockExecuteFunctions: any;

  beforeEach(() => {
    mockExecuteFunctions = {
      getNodeParameter: jest.fn(),
      getCredentials: jest.fn().mockResolvedValue({
        apiKey: 'test-api-key',
        baseUrl: 'https://agentverse.ai/api/v1',
      }),
      getInputData: jest.fn().mockReturnValue([{ json: {} }]),
      getNode: jest.fn().mockReturnValue({ name: 'Test Node' }),
      continueOnFail: jest.fn().mockReturnValue(false),
      helpers: {
        httpRequest: jest.fn(),
      },
    };
  });

  it('should list agents successfully', async () => {
    mockExecuteFunctions.getNodeParameter
      .mockReturnValueOnce('listAgents')
      .mockReturnValueOnce(50)
      .mockReturnValueOnce(0)
      .mockReturnValueOnce('active');

    mockExecuteFunctions.helpers.httpRequest.mockResolvedValue({
      agents: [{ id: 'agent1', name: 'Test Agent' }],
      total: 1,
    });

    const result = await executeAgentOperations.call(mockExecuteFunctions, [{ json: {} }]);

    expect(result).toHaveLength(1);
    expect(result[0].json).toEqual({
      agents: [{ id: 'agent1', name: 'Test Agent' }],
      total: 1,
    });
  });

  it('should create agent successfully', async () => {
    mockExecuteFunctions.getNodeParameter
      .mockReturnValueOnce('createAgent')
      .mockReturnValueOnce('Test Agent')
      .mockReturnValueOnce('Test Description')
      .mockReturnValueOnce('print("Hello World")')
      .mockReturnValueOnce('test-mailbox-key');

    mockExecuteFunctions.helpers.httpRequest.mockResolvedValue({
      id: 'agent123',
      name: 'Test Agent',
      status: 'created',
    });

    const result = await executeAgentOperations.call(mockExecuteFunctions, [{ json: {} }]);

    expect(result).toHaveLength(1);
    expect(result[0].json.id).toBe('agent123');
  });

  it('should get agent successfully', async () => {
    mockExecuteFunctions.getNodeParameter
      .mockReturnValueOnce('getAgent')
      .mockReturnValueOnce('agent123');

    mockExecuteFunctions.helpers.httpRequest.mockResolvedValue({
      id: 'agent123',
      name: 'Test Agent',
      status: 'active',
    });

    const result = await executeAgentOperations.call(mockExecuteFunctions, [{ json: {} }]);

    expect(result).toHaveLength(1);
    expect(result[0].json.id).toBe('agent123');
  });

  it('should update agent successfully', async () => {
    mockExecuteFunctions.getNodeParameter
      .mockReturnValueOnce('updateAgent')
      .mockReturnValueOnce('agent123')
      .mockReturnValueOnce('Updated Agent')
      .mockReturnValueOnce('Updated Description')
      .mockReturnValueOnce('print("Updated Code")');

    mockExecuteFunctions.helpers.httpRequest.mockResolvedValue({
      id: 'agent123',
      name: 'Updated Agent',
      status: 'updated',
    });

    const result = await executeAgentOperations.call(mockExecuteFunctions, [{ json: {} }]);

    expect(result).toHaveLength(1);
    expect(result[0].json.name).toBe('Updated Agent');
  });

  it('should delete agent successfully', async () => {
    mockExecuteFunctions.getNodeParameter
      .mockReturnValueOnce('deleteAgent')
      .mockReturnValueOnce('agent123');

    mockExecuteFunctions.helpers.httpRequest.mockResolvedValue({
      message: 'Agent deleted successfully',
    });

    const result = await executeAgentOperations.call(mockExecuteFunctions, [{ json: {} }]);

    expect(result).toHaveLength(1);
    expect(result[0].json.message).toBe('Agent deleted successfully');
  });

  it('should start agent successfully', async () => {
    mockExecuteFunctions.getNodeParameter
      .mockReturnValueOnce('startAgent')
      .mockReturnValueOnce('agent123');

    mockExecuteFunctions.helpers.httpRequest.mockResolvedValue({
      id: 'agent123',
      status: 'running',
    });

    const result = await executeAgentOperations.call(mockExecuteFunctions, [{ json: {} }]);

    expect(result).toHaveLength(1);
    expect(result[0].json.status).toBe('running');
  });

  it('should stop agent successfully', async () => {
    mockExecuteFunctions.getNodeParameter
      .mockReturnValueOnce('stopAgent')
      .mockReturnValueOnce('agent123');

    mockExecuteFunctions.helpers.httpRequest.mockResolvedValue({
      id: 'agent123',
      status: 'stopped',
    });

    const result = await executeAgentOperations.call(mockExecuteFunctions, [{ json: {} }]);

    expect(result).toHaveLength(1);
    expect(result[0].json.status).toBe('stopped');
  });

  it('should handle errors when continueOnFail is true', async () => {
    mockExecuteFunctions.getNodeParameter.mockReturnValueOnce('listAgents');
    mockExecuteFunctions.continueOnFail.mockReturnValue(true);
    mockExecuteFunctions.helpers.httpRequest.mockRejectedValue(new Error('API Error'));

    const result = await executeAgentOperations.call(mockExecuteFunctions, [{ json: {} }]);

    expect(result).toHaveLength(1);
    expect(result[0].json.error).toBe('API Error');
  });

  it('should throw error when continueOnFail is false', async () => {
    mockExecuteFunctions.getNodeParameter.mockReturnValueOnce('listAgents');
    mockExecuteFunctions.continueOnFail.mockReturnValue(false);
    mockExecuteFunctions.helpers.httpRequest.mockRejectedValue(new Error('API Error'));

    await expect(executeAgentOperations.call(mockExecuteFunctions, [{ json: {} }])).rejects.toThrow('API Error');
  });
});

describe('Function Resource', () => {
	let mockExecuteFunctions: any;

	beforeEach(() => {
		mockExecuteFunctions = {
			getNodeParameter: jest.fn(),
			getCredentials: jest.fn().mockResolvedValue({
				apiKey: 'test-key',
				baseUrl: 'https://agentverse.ai/api/v1',
			}),
			getInputData: jest.fn().mockReturnValue([{ json: {} }]),
			getNode: jest.fn().mockReturnValue({ name: 'Test Node' }),
			continueOnFail: jest.fn().mockReturnValue(false),
			helpers: {
				httpRequest: jest.fn(),
				requestWithAuthentication: jest.fn(),
			},
		};
	});

	describe('listFunctions operation', () => {
		it('should list functions successfully', async () => {
			mockExecuteFunctions.getNodeParameter
				.mockReturnValueOnce('listFunctions')
				.mockReturnValueOnce('agent1q123')
				.mockReturnValueOnce(10)
				.mockReturnValueOnce(0);

			const mockResponse = {
				functions: [
					{ id: 'func1', name: 'test-function', description: 'A test function' }
				],
				total: 1
			};

			mockExecuteFunctions.helpers.httpRequest.mockResolvedValue(mockResponse);

			const result = await executeFunctionOperations.call(mockExecuteFunctions, [{ json: {} }]);

			expect(mockExecuteFunctions.helpers.httpRequest).toHaveBeenCalledWith({
				method: 'GET',
				url: 'https://agentverse.ai/api/v1/functions',
				headers: {
					'Authorization': 'Bearer test-key',
					'Content-Type': 'application/json',
				},
				qs: {
					agent_id: 'agent1q123',
					limit: 10,
					offset: 0,
				},
				json: true,
			});

			expect(result).toEqual([{
				json: mockResponse,
				pairedItem: { item: 0 },
			}]);
		});

		it('should handle listFunctions error', async () => {
			mockExecuteFunctions.getNodeParameter
				.mockReturnValueOnce('listFunctions')
				.mockReturnValueOnce('agent1q123');
			mockExecuteFunctions.continueOnFail.mockReturnValue(true);
			mockExecuteFunctions.helpers.httpRequest.mockRejectedValue(new Error('API Error'));

			const result = await executeFunctionOperations.call(mockExecuteFunctions, [{ json: {} }]);

			expect(result).toEqual([{
				json: { error: 'API Error' },
				pairedItem: { item: 0 },
			}]);
		});
	});

	describe('createFunction operation', () => {
		it('should create function successfully', async () => {
			mockExecuteFunctions.getNodeParameter
				.mockReturnValueOnce('createFunction')
				.mockReturnValueOnce('agent1q123')
				.mockReturnValueOnce('test-function')
				.mockReturnValueOnce('A test function')
				.mockReturnValueOnce('{"type": "object"}');

			const mockResponse = {
				id: 'func123',
				name: 'test-function',
				description: 'A test function',
				schema: { type: 'object' }
			};

			mockExecuteFunctions.helpers.httpRequest.mockResolvedValue(mockResponse);

			const result = await executeFunctionOperations.call(mockExecuteFunctions, [{ json: {} }]);

			expect(mockExecuteFunctions.helpers.httpRequest).toHaveBeenCalledWith({
				method: 'POST',
				url: 'https://agentverse.ai/api/v1/functions',
				headers: {
					'Authorization': 'Bearer test-key',
					'Content-Type': 'application/json',
				},
				body: {
					agent_id: 'agent1q123',
					name: 'test-function',
					description: 'A test function',
					schema: { type: 'object' },
				},
				json: true,
			});

			expect(result).toEqual([{
				json: mockResponse,
				pairedItem: { item: 0 },
			}]);
		});
	});

	describe('getFunction operation', () => {
		it('should get function successfully', async () => {
			mockExecuteFunctions.getNodeParameter
				.mockReturnValueOnce('getFunction')
				.mockReturnValueOnce('func123');

			const mockResponse = {
				id: 'func123',
				name: 'test-function',
				description: 'A test function'
			};

			mockExecuteFunctions.helpers.httpRequest.mockResolvedValue(mockResponse);

			const result = await executeFunctionOperations.call(mockExecuteFunctions, [{ json: {} }]);

			expect(mockExecuteFunctions.helpers.httpRequest).toHaveBeenCalledWith({
				method: 'GET',
				url: 'https://agentverse.ai/api/v1/functions/func123',
				headers: {
					'Authorization': 'Bearer test-key',
					'Content-Type': 'application/json',
				},
				json: true,
			});

			expect(result).toEqual([{
				json: mockResponse,
				pairedItem: { item: 0 },
			}]);
		});
	});

	describe('updateFunction operation', () => {
		it('should update function successfully', async () => {
			mockExecuteFunctions.getNodeParameter
				.mockReturnValueOnce('updateFunction')
				.mockReturnValueOnce('func123')
				.mockReturnValueOnce('updated-function')
				.mockReturnValueOnce('Updated description')
				.mockReturnValueOnce('{"type": "string"}');

			const mockResponse = {
				id: 'func123',
				name: 'updated-function',
				description: 'Updated description'
			};

			mockExecuteFunctions.helpers.httpRequest.mockResolvedValue(mockResponse);

			const result = await executeFunctionOperations.call(mockExecuteFunctions, [{ json: {} }]);

			expect(mockExecuteFunctions.helpers.httpRequest).toHaveBeenCalledWith({
				method: 'PUT',
				url: 'https://agentverse.ai/api/v1/functions/func123',
				headers: {
					'Authorization': 'Bearer test-key',
					'Content-Type': 'application/json',
				},
				body: {
					name: 'updated-function',
					description: 'Updated description',
					schema: { type: 'string' },
				},
				json: true,
			});

			expect(result).toEqual([{
				json: mockResponse,
				pairedItem: { item: 0 },
			}]);
		});
	});

	describe('deleteFunction operation', () => {
		it('should delete function successfully', async () => {
			mockExecuteFunctions.getNodeParameter
				.mockReturnValueOnce('deleteFunction')
				.mockReturnValueOnce('func123');

			const mockResponse = { success: true };

			mockExecuteFunctions.helpers.httpRequest.mockResolvedValue(mockResponse);

			const result = await executeFunctionOperations.call(mockExecuteFunctions, [{ json: {} }]);

			expect(mockExecuteFunctions.helpers.httpRequest).toHaveBeenCalledWith({
				method: 'DELETE',
				url: 'https://agentverse.ai/api/v1/functions/func123',
				headers: {
					'Authorization': 'Bearer test-key',
					'Content-Type': 'application/json',
				},
				json: true,
			});

			expect(result).toEqual([{
				json: mockResponse,
				pairedItem: { item: 0 },
			}]);
		});
	});
});

describe('Almanac Resource', () => {
	let mockExecuteFunctions: any;

	beforeEach(() => {
		mockExecuteFunctions = {
			getNodeParameter: jest.fn(),
			getCredentials: jest.fn().mockResolvedValue({
				apiKey: 'test-api-key',
				baseUrl: 'https://agentverse.ai/api/v1',
			}),
			getInputData: jest.fn().mockReturnValue([{ json: {} }]),
			getNode: jest.fn().mockReturnValue({ name: 'Test Node' }),
			continueOnFail: jest.fn().mockReturnValue(false),
			helpers: {
				httpRequest: jest.fn(),
				requestWithAuthentication: jest.fn(),
			},
		};
	});

	describe('searchAgents', () => {
		it('should search agents successfully', async () => {
			const mockResponse = { agents: [{ id: 'agent1', capabilities: ['test'] }] };
			mockExecuteFunctions.getNodeParameter
				.mockReturnValueOnce('searchAgents')
				.mockReturnValueOnce('test query')
				.mockReturnValueOnce('protocol1,protocol2')
				.mockReturnValueOnce(10)
				.mockReturnValueOnce(0);
			mockExecuteFunctions.helpers.httpRequest.mockResolvedValue(mockResponse);

			const result = await executeAlmanacOperations.call(mockExecuteFunctions, [{ json: {} }]);

			expect(result).toEqual([{ json: mockResponse, pairedItem: { item: 0 } }]);
			expect(mockExecuteFunctions.helpers.httpRequest).toHaveBeenCalledWith({
				method: 'GET',
				url: 'https://agentverse.ai/api/v1/almanac/agents?query=test+query&protocols=protocol1%2Cprotocol2&limit=10&offset=0',
				headers: {
					'Authorization': 'Bearer test-api-key',
					'Content-Type': 'application/json',
				},
				json: true,
			});
		});

		it('should handle search agents error', async () => {
			mockExecuteFunctions.getNodeParameter.mockReturnValue('searchAgents');
			mockExecuteFunctions.helpers.httpRequest.mockRejectedValue(new Error('API Error'));

			await expect(executeAlmanacOperations.call(mockExecuteFunctions, [{ json: {} }]))
				.rejects.toThrow('API Error');
		});
	});

	describe('registerService', () => {
		it('should register service successfully', async () => {
			const mockResponse = { service_id: 'service123', status: 'registered' };
			mockExecuteFunctions.getNodeParameter
				.mockReturnValueOnce('registerService')
				.mockReturnValueOnce('agent1q123456789')
				.mockReturnValueOnce('data_processing')
				.mockReturnValueOnce('{"api": "http://localhost:8080"}')
				.mockReturnValueOnce('{"description": "Test service"}');
			mockExecuteFunctions.helpers.httpRequest.mockResolvedValue(mockResponse);

			const result = await executeAlmanacOperations.call(mockExecuteFunctions, [{ json: {} }]);

			expect(result).toEqual([{ json: mockResponse, pairedItem: { item: 0 } }]);
			expect(mockExecuteFunctions.helpers.httpRequest).toHaveBeenCalledWith({
				method: 'POST',
				url: 'https://agentverse.ai/api/v1/almanac/register',
				headers: {
					'Authorization': 'Bearer test-api-key',
					'Content-Type': 'application/json',
				},
				body: {
					agent_address: 'agent1q123456789',
					service_type: 'data_processing',
					endpoints: { api: 'http://localhost:8080' },
					metadata: { description: 'Test service' },
				},
				json: true,
			});
		});

		it('should handle invalid JSON in endpoints', async () => {
			mockExecuteFunctions.getNodeParameter
				.mockReturnValueOnce('registerService')
				.mockReturnValueOnce('agent1q123456789')
				.mockReturnValueOnce('data_processing')
				.mockReturnValueOnce('invalid json')
				.mockReturnValueOnce('{}');

			await expect(executeAlmanacOperations.call(mockExecuteFunctions, [{ json: {} }]))
				.rejects.toThrow('Invalid JSON in endpoints');
		});
	});

	describe('getServices', () => {
		it('should get services successfully', async () => {
			const mockResponse = { services: [{ id: 'service1', type: 'data_processing' }] };
			mockExecuteFunctions.getNodeParameter
				.mockReturnValueOnce('getServices')
				.mockReturnValueOnce('data_processing')
				.mockReturnValueOnce('agent1q123456789')
				.mockReturnValueOnce(20)
				.mockReturnValueOnce(5);
			mockExecuteFunctions.helpers.httpRequest.mockResolvedValue(mockResponse);

			const result = await executeAlmanacOperations.call(mockExecuteFunctions, [{ json: {} }]);

			expect(result).toEqual([{ json: mockResponse, pairedItem: { item: 0 } }]);
		});
	});

	describe('updateService', () => {
		it('should update service successfully', async () => {
			const mockResponse = { service_id: 'service123', status: 'updated' };
			mockExecuteFunctions.getNodeParameter
				.mockReturnValueOnce('updateService')
				.mockReturnValueOnce('service123')
				.mockReturnValueOnce('{"api": "http://localhost:9090"}')
				.mockReturnValueOnce('{"version": "2.0"}');
			mockExecuteFunctions.helpers.httpRequest.mockResolvedValue(mockResponse);

			const result = await executeAlmanacOperations.call(mockExecuteFunctions, [{ json: {} }]);

			expect(result).toEqual([{ json: mockResponse, pairedItem: { item: 0 } }]);
		});
	});

	describe('unregisterService', () => {
		it('should unregister service successfully', async () => {
			const mockResponse = { status: 'unregistered' };
			mockExecuteFunctions.getNodeParameter
				.mockReturnValueOnce('unregisterService')
				.mockReturnValueOnce('service123');
			mockExecuteFunctions.helpers.httpRequest.mockResolvedValue(mockResponse);

			const result = await executeAlmanacOperations.call(mockExecuteFunctions, [{ json: {} }]);

			expect(result).toEqual([{ json: mockResponse, pairedItem: { item: 0 } }]);
			expect(mockExecuteFunctions.helpers.httpRequest).toHaveBeenCalledWith({
				method: 'DELETE',
				url: 'https://agentverse.ai/api/v1/almanac/services/service123',
				headers: {
					'Authorization': 'Bearer test-api-key',
					'Content-Type': 'application/json',
				},
				json: true,
			});
		});
	});
});

describe('Message Resource', () => {
	let mockExecuteFunctions: any;

	beforeEach(() => {
		mockExecuteFunctions = {
			getNodeParameter: jest.fn(),
			getCredentials: jest.fn().mockResolvedValue({
				apiKey: 'test-api-key',
				baseUrl: 'https://agentverse.ai/api/v1'
			}),
			getInputData: jest.fn().mockReturnValue([{ json: {} }]),
			getNode: jest.fn().mockReturnValue({ name: 'Fetch.ai Node' }),
			continueOnFail: jest.fn().mockReturnValue(false),
			helpers: {
				httpRequest: jest.fn(),
			},
		};
	});

	test('getMessages operation should retrieve messages successfully', async () => {
		const mockMessages = {
			messages: [
				{ id: '1', content: 'Test message', status: 'delivered' },
				{ id: '2', content: 'Another message', status: 'pending' }
			],
			total: 2
		};

		mockExecuteFunctions.getNodeParameter
			.mockReturnValueOnce('getMessages')
			.mockReturnValueOnce('agent1q123...')
			.mockReturnValueOnce(50)
			.mockReturnValueOnce(0)
			.mockReturnValueOnce('');

		mockExecuteFunctions.helpers.httpRequest.mockResolvedValue(mockMessages);

		const result = await executeMessageOperations.call(mockExecuteFunctions, [{ json: {} }]);

		expect(result).toHaveLength(1);
		expect(result[0].json).toEqual(mockMessages);
		expect(mockExecuteFunctions.helpers.httpRequest).toHaveBeenCalledWith({
			method: 'GET',
			url: 'https://agentverse.ai/api/v1/messages',
			headers: {
				'Authorization': 'Bearer test-api-key',
				'Content-Type': 'application/json',
			},
			qs: {
				agent_id: 'agent1q123...',
				limit: 50,
				offset: 0,
			},
			json: true,
		});
	});

	test('sendMessage operation should send message successfully', async () => {
		const mockResponse = { id: 'msg123', status: 'sent' };

		mockExecuteFunctions.getNodeParameter
			.mockReturnValueOnce('sendMessage')
			.mockReturnValueOnce('agent1q123...')
			.mockReturnValueOnce('agent1q456...')
			.mockReturnValueOnce('greeting')
			.mockReturnValueOnce({ text: 'Hello!' });

		mockExecuteFunctions.helpers.httpRequest.mockResolvedValue(mockResponse);

		const result = await executeMessageOperations.call(mockExecuteFunctions, [{ json: {} }]);

		expect(result).toHaveLength(1);
		expect(result[0].json).toEqual(mockResponse);
		expect(mockExecuteFunctions.helpers.httpRequest).toHaveBeenCalledWith({
			method: 'POST',
			url: 'https://agentverse.ai/api/v1/messages',
			headers: {
				'Authorization': 'Bearer test-api-key',
				'Content-Type': 'application/json',
			},
			body: {
				sender_address: 'agent1q123...',
				target_address: 'agent1q456...',
				message_type: 'greeting',
				payload: { text: 'Hello!' },
			},
			json: true,
		});
	});

	test('getMessage operation should retrieve specific message successfully', async () => {
		const mockMessage = {
			id: 'msg123',
			content: 'Test message',
			status: 'delivered',
			timestamp: '2023-01-01T00:00:00Z'
		};

		mockExecuteFunctions.getNodeParameter
			.mockReturnValueOnce('getMessage')
			.mockReturnValueOnce('msg123');

		mockExecuteFunctions.helpers.httpRequest.mockResolvedValue(mockMessage);

		const result = await executeMessageOperations.call(mockExecuteFunctions, [{ json: {} }]);

		expect(result).toHaveLength(1);
		expect(result[0].json).toEqual(mockMessage);
		expect(mockExecuteFunctions.helpers.httpRequest).toHaveBeenCalledWith({
			method: 'GET',
			url: 'https://agentverse.ai/api/v1/messages/msg123',
			headers: {
				'Authorization': 'Bearer test-api-key',
				'Content-Type': 'application/json',
			},
			json: true,
		});
	});

	test('updateMessage operation should update message status successfully', async () => {
		const mockResponse = { id: 'msg123', status: 'read' };

		mockExecuteFunctions.getNodeParameter
			.mockReturnValueOnce('updateMessage')
			.mockReturnValueOnce('msg123')
			.mockReturnValueOnce('read');

		mockExecuteFunctions.helpers.httpRequest.mockResolvedValue(mockResponse);

		const result = await executeMessageOperations.call(mockExecuteFunctions, [{ json: {} }]);

		expect(result).toHaveLength(1);
		expect(result[0].json).toEqual(mockResponse);
		expect(mockExecuteFunctions.helpers.httpRequest).toHaveBeenCalledWith({
			method: 'PUT',
			url: 'https://agentverse.ai/api/v1/messages/msg123',
			headers: {
				'Authorization': 'Bearer test-api-key',
				'Content-Type': 'application/json',
			},
			body: {
				status: 'read',
			},
			json: true,
		});
	});

	test('deleteMessage operation should delete message successfully', async () => {
		const mockResponse = { success: true };

		mockExecuteFunctions.getNodeParameter
			.mockReturnValueOnce('deleteMessage')
			.mockReturnValueOnce('msg123');

		mockExecuteFunctions.helpers.httpRequest.mockResolvedValue(mockResponse);

		const result = await executeMessageOperations.call(mockExecuteFunctions, [{ json: {} }]);

		expect(result).toHaveLength(1);
		expect(result[0].json).toEqual(mockResponse);
		expect(mockExecuteFunctions.helpers.httpRequest).toHaveBeenCalledWith({
			method: 'DELETE',
			url: 'https://agentverse.ai/api/v1/messages/msg123',
			headers: {
				'Authorization': 'Bearer test-api-key',
				'Content-Type': 'application/json',
			},
			json: true,
		});
	});

	test('should handle API errors correctly', async () => {
		mockExecuteFunctions.getNodeParameter.mockReturnValueOnce('getMessages');
		mockExecuteFunctions.helpers.httpRequest.mockRejectedValue(new Error('API Error'));
		mockExecuteFunctions.continueOnFail.mockReturnValue(true);

		const result = await executeMessageOperations.call(mockExecuteFunctions, [{ json: {} }]);

		expect(result).toHaveLength(1);
		expect(result[0].json).toEqual({ error: 'API Error' });
	});

	test('should throw unknown operation error', async () => {
		mockExecuteFunctions.getNodeParameter.mockReturnValueOnce('unknownOperation');

		await expect(executeMessageOperations.call(mockExecuteFunctions, [{ json: {} }])).rejects.toThrow('Unknown operation: unknownOperation');
	});
});

describe('Wallet Resource', () => {
	let mockExecuteFunctions: any;

	beforeEach(() => {
		mockExecuteFunctions = {
			getNodeParameter: jest.fn(),
			getCredentials: jest.fn().mockResolvedValue({
				apiKey: 'test-api-key',
				baseUrl: 'https://agentverse.ai/api/v1',
			}),
			getInputData: jest.fn().mockReturnValue([{ json: {} }]),
			getNode: jest.fn().mockReturnValue({ name: 'Test Node' }),
			continueOnFail: jest.fn().mockReturnValue(false),
			helpers: {
				httpRequest: jest.fn(),
			},
		};
	});

	it('should get wallets successfully', async () => {
		const mockWallets = { wallets: [{ id: 'wallet1', name: 'Test Wallet' }] };
		mockExecuteFunctions.getNodeParameter
			.mockReturnValueOnce('getWallets')
			.mockReturnValueOnce('agent1qtest')
			.mockReturnValueOnce(20)
			.mockReturnValueOnce(0);
		mockExecuteFunctions.helpers.httpRequest.mockResolvedValue(mockWallets);

		const result = await executeWalletOperations.call(mockExecuteFunctions, [{ json: {} }]);

		expect(result).toEqual([{ json: mockWallets, pairedItem: { item: 0 } }]);
		expect(mockExecuteFunctions.helpers.httpRequest).toHaveBeenCalledWith({
			method: 'GET',
			url: 'https://agentverse.ai/api/v1/wallets',
			headers: {
				'Authorization': 'Bearer test-api-key',
				'Content-Type': 'application/json',
			},
			qs: {
				agent_id: 'agent1qtest',
				limit: 20,
				offset: 0,
			},
			json: true,
		});
	});

	it('should create wallet successfully', async () => {
		const mockWallet = { id: 'wallet1', name: 'New Wallet' };
		mockExecuteFunctions.getNodeParameter
			.mockReturnValueOnce('createWallet')
			.mockReturnValueOnce('agent1qtest')
			.mockReturnValueOnce('New Wallet');
		mockExecuteFunctions.helpers.httpRequest.mockResolvedValue(mockWallet);

		const result = await executeWalletOperations.call(mockExecuteFunctions, [{ json: {} }]);

		expect(result).toEqual([{ json: mockWallet, pairedItem: { item: 0 } }]);
		expect(mockExecuteFunctions.helpers.httpRequest).toHaveBeenCalledWith({
			method: 'POST',
			url: 'https://agentverse.ai/api/v1/wallets',
			headers: {
				'Authorization': 'Bearer test-api-key',
				'Content-Type': 'application/json',
			},
			body: {
				agent_id: 'agent1qtest',
				name: 'New Wallet',
			},
			json: true,
		});
	});

	it('should transfer tokens successfully', async () => {
		const mockTransfer = { transaction_id: 'tx123', status: 'completed' };
		mockExecuteFunctions.getNodeParameter
			.mockReturnValueOnce('transferTokens')
			.mockReturnValueOnce('wallet1')
			.mockReturnValueOnce('agent1qreceiver')
			.mockReturnValueOnce('100');
		mockExecuteFunctions.helpers.httpRequest.mockResolvedValue(mockTransfer);

		const result = await executeWalletOperations.call(mockExecuteFunctions, [{ json: {} }]);

		expect(result).toEqual([{ json: mockTransfer, pairedItem: { item: 0 } }]);
		expect(mockExecuteFunctions.helpers.httpRequest).toHaveBeenCalledWith({
			method: 'POST',
			url: 'https://agentverse.ai/api/v1/wallets/wallet1/transfer',
			headers: {
				'Authorization': 'Bearer test-api-key',
				'Content-Type': 'application/json',
			},
			body: {
				to_address: 'agent1qreceiver',
				amount: '100',
			},
			json: true,
		});
	});

	it('should handle errors gracefully when continueOnFail is true', async () => {
		mockExecuteFunctions.getNodeParameter.mockReturnValueOnce('getWallets');
		mockExecuteFunctions.helpers.httpRequest.mockRejectedValue(new Error('API Error'));
		mockExecuteFunctions.continueOnFail.mockReturnValue(true);

		const result = await executeWalletOperations.call(mockExecuteFunctions, [{ json: {} }]);

		expect(result).toEqual([{ json: { error: 'API Error' }, pairedItem: { item: 0 } }]);
	});

	it('should throw error when continueOnFail is false', async () => {
		mockExecuteFunctions.getNodeParameter.mockReturnValueOnce('getWallets');
		mockExecuteFunctions.helpers.httpRequest.mockRejectedValue(new Error('API Error'));
		mockExecuteFunctions.continueOnFail.mockReturnValue(false);

		await expect(executeWalletOperations.call(mockExecuteFunctions, [{ json: {} }])).rejects.toThrow('API Error');
	});
});
});
