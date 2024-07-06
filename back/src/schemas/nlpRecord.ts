import { Schema, model } from 'mongoose';
import { createdAtSchemaDefinition } from '../utils/schemas';
import { NlpRecord } from '../types/nlpRecord';

///////////////////////////////////////////////////////////////////////////////

const NlpRecordSchema = new Schema<NlpRecord>({
  ...createdAtSchemaDefinition,
  data: { type: Object },
});

export const NlpRecordModel = model<NlpRecord>('NlpRecord', NlpRecordSchema, 'nlp_records');
