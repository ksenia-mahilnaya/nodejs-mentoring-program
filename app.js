import { User, Product } from './models/index';
import * as config from './config/config.json';

console.log(config.name);
const product = new Product();
const user = new User();