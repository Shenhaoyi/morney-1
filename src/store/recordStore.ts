import recordListModel from '@/models/recordListModel';

export default {
  recordList: recordListModel.fetch(),
  recordCreate: (record: RecordItem) => recordListModel.create(record),
};