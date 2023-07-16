export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[];

export interface Database {
  public: {
    Tables: {
      board: {
        Row: {
          id: number;
          title: string | null;
          userid: string | null;
        };
        Insert: {
          id?: number;
          title?: string | null;
          userid?: string | null;
        };
        Update: {
          id?: number;
          title?: string | null;
          userid?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "board_userid_fkey";
            columns: ["userid"];
            referencedRelation: "users";
            referencedColumns: ["id"];
          }
        ];
      };
      Columns: {
        Row: {
          boardid: number | null;
          color: string | null;
          id: number;
          title: string | null;
        };
        Insert: {
          boardid?: number | null;
          color?: string | null;
          id?: number;
          title?: string | null;
        };
        Update: {
          boardid?: number | null;
          color?: string | null;
          id?: number;
          title?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "Columns_boardid_fkey";
            columns: ["boardid"];
            referencedRelation: "board";
            referencedColumns: ["id"];
          }
        ];
      };
      subtask: {
        Row: {
          complete: boolean;
          id: number;
          taskid: number;
          title: string;
        };
        Insert: {
          complete?: boolean;
          id?: number;
          taskid: number;
          title: string;
        };
        Update: {
          complete?: boolean;
          id?: number;
          taskid?: number;
          title?: string;
        };
        Relationships: [
          {
            foreignKeyName: "subtask_taskid_fkey";
            columns: ["taskid"];
            referencedRelation: "task";
            referencedColumns: ["id"];
          }
        ];
      };
      task: {
        Row: {
          columnid: number | null;
          id: number;
          title: string | null;
          description: string | null;
          position?: string | null;
        };
        Insert: {
          columnid?: number | null;
          id?: number;
          title?: string | null;
          description: string | null;
          position?: string | null;
        };
        Update: {
          columnid?: number | null;
          id?: number;
          title?: string | null;
          description: string | null;
          position?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "task_columnid_fkey";
            columns: ["columnid"];
            referencedRelation: "Columns";
            referencedColumns: ["id"];
          }
        ];
      };
      Users: {
        Row: {
          authid: string | null;
          id: string;
        };
        Insert: {
          authid?: string | null;
          id?: string;
        };
        Update: {
          authid?: string | null;
          id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "Users_authid_fkey";
            columns: ["authid"];
            referencedRelation: "users";
            referencedColumns: ["id"];
          }
        ];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}
