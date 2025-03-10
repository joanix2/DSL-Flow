import { gql, ApolloClient, InMemoryCache } from "@apollo/client";
import { FunctionTemplate } from "./DataTypes";

// Créer une instance Apollo Client
const client = new ApolloClient({
  uri: "http://127.0.0.1:8000/graphql/", // URL de l'API GraphQL Django
  cache: new InMemoryCache(),
});

class FunctionService {
  private functions: Record<string, FunctionTemplate> = {};

  async addFunction(fn: FunctionTemplate): Promise<FunctionTemplate | null> {
    const mutation = gql`
      mutation CreateFunctionTemplate($tag: String!, $attributes: JSONString) {
        createFunctionTemplate(tag: $tag, attributes: $attributes) {
          functionTemplate {
            tag
            attributes
            createdAt
          }
        }
      }
    `;

    try {
      const { data } = await client.mutate({
        mutation,
        variables: { tag: fn.tag, attributes: JSON.stringify(fn.attributes) },
      });

      return data.createFunctionTemplate.functionTemplate;
    } catch (error) {
      console.error("Error creating function:", error);
      return null;
    }
  }

  async getFunctions(): Promise<FunctionTemplate[]> {
    const query = gql`
      query {
        allFunctionTemplates {
          tag
          attributes
          createdAt
        }
      }
    `;

    try {
      const { data } = await client.query({ query });
      const functions = data.allFunctionTemplates.map(
        (fn: FunctionTemplate) => ({
          tag: fn.tag,
          attributes: fn.attributes,
        })
      );

      this.functions = functions;

      return functions;
    } catch (error) {
      console.error("Error fetching functions:", error);
      return [];
    }
  }

  async updateFunction(fn: FunctionTemplate): Promise<boolean> {
    const mutation = gql`
      mutation UpdateFunctionTemplate($tag: String!, $attributes: JSONString) {
        createFunctionTemplate(tag: $tag, attributes: $attributes) {
          functionTemplate {
            tag
            attributes
          }
        }
      }
    `;

    try {
      await client.mutate({
        mutation,
        variables: { tag: fn.tag, attributes: JSON.stringify(fn.attributes) },
      });

      return true;
    } catch (error) {
      console.error("Error updating function:", error);
      return false;
    }
  }

  async deleteFunction(tag: string): Promise<boolean> {
    const mutation = gql`
      mutation {
        deleteFunctionTemplate(tag: "${tag}") {
          success
        }
      }
    `;

    try {
      await client.mutate({ mutation });
      return true;
    } catch (error) {
      console.error("Error deleting function:", error);
      return false;
    }
  }

  async getFunctionByTag(tag: string): Promise<FunctionTemplate | null> {
    return this.functions[tag] || null;
  }
}

export default new FunctionService();
