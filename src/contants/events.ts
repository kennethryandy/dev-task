// Thie file is used for autogenerating rust code so make sure you maintain the structure otherwise it would create unwanted issues

const EVENTS: {
  STATE_CHANGE_EVENT: string;
  STATE_SYNC_EVENT: string;
  EMIT_FOLDERS: string;
  ON_CLIENT_READY: string;
} = {
  STATE_CHANGE_EVENT: "state_change_event",
  STATE_SYNC_EVENT: "state_sync_event",
  EMIT_FOLDERS: "latest-folders",
  ON_CLIENT_READY: "on-ready"
};

export default EVENTS;
