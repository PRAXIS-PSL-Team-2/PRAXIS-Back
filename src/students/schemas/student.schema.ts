import { InjectModel } from '@nestjs/mongoose';
import { Model} from 'mongoose';

@InjectModel('User') const userModel: Model<User>