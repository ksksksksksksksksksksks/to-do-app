export class Todo {
    id!: number;
    todo: string = '';
    completed: boolean = false;
    userId!: number;
  
    constructor(values: Object = {}) {
      Object.assign(this, values);
    }
}