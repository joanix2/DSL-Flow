import { FunctionTemplate } from "./DataTypes";

class FunctionService {
  private functions: Record<string, FunctionTemplate> = {};

  addFunction(fn: FunctionTemplate) {
    this.functions[fn.tag] = fn;
  }

  async getFunctions(): Promise<FunctionTemplate[]> {
    return Object.values(this.functions);
  }

  getFunctionByTag(id: string): FunctionTemplate | undefined {
    return this.functions[id];
  }

  deleteFunction(id: string) {
    delete this.functions[id];
  }

  updateFunction(updatedFn: FunctionTemplate) {
    if (this.functions[updatedFn.tag]) {
      this.functions[updatedFn.tag] = updatedFn;
    } else {
      console.warn(`Function with ID ${updatedFn.tag} not found.`);
    }
  }
}

export default new FunctionService();
