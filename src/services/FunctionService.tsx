import { FunctionTemplate } from "./DataTypes";

class FunctionService {
  private functions: Record<string, FunctionTemplate> = {};

  addFunction(fn: FunctionTemplate) {
    this.functions[fn.id] = fn;
  }

  getFunctions(): FunctionTemplate[] {
    return Object.values(this.functions);
  }

  getFunctionById(id: string): FunctionTemplate | undefined {
    return this.functions[id];
  }

  deleteFunction(id: string) {
    delete this.functions[id];
  }

  updateFunction(updatedFn: FunctionTemplate) {
    if (this.functions[updatedFn.id]) {
      this.functions[updatedFn.id] = updatedFn;
    } else {
      console.warn(`Function with ID ${updatedFn.id} not found.`);
    }
  }
}

export default new FunctionService();
