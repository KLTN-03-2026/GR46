import { DataSource } from 'typeorm';

export type ChatbotUserContext = {
  id: number | null;
  vai_tro: 'guest' | 'nguoi_dung' | 'chu_cua_hang' | 'admin';
  id_cua_hang?: number | null;
};

export type ToolDefinition = {
  name: string;
  description: string;
  parameters: Record<string, unknown>;
  vai_tro_cho_phep: ChatbotUserContext['vai_tro'][];
  handler: (
    args: Record<string, unknown>,
    ctx: ChatbotUserContext,
    ds: DataSource,
  ) => Promise<unknown>;
};

export type OpenAiTool = {
  type: 'function';
  function: {
    name: string;
    description: string;
    parameters: Record<string, unknown>;
  };
};
