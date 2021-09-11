export enum ActionTypes {
  Load = 'load',
  Create = 'create',
  Update = 'update',
  Delete = 'delete',
}

export const actionTypeNamePresentTense = {
  [ActionTypes.Load]: 'Load',
  [ActionTypes.Create]: 'Create',
  [ActionTypes.Update]: 'Update',
  [ActionTypes.Delete]: 'Delete',
};

export const actionTypeNamePastTense = {
  [ActionTypes.Load]: 'Loaded',
  [ActionTypes.Create]: 'Created',
  [ActionTypes.Update]: 'Updated',
  [ActionTypes.Delete]: 'Deleted',
};

export const getActionType = (action: string): ActionTypes =>
  Object.values(ActionTypes).find((actionType) =>
    action.toLowerCase().includes(actionType)
  ) || ActionTypes.Create;
