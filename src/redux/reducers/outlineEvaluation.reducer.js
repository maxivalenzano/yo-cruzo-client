import { outlineEvaluationConstants } from '../../constants';

function outlineEvaluation(state = {}, action) {
  switch (action.type) {
    case outlineEvaluationConstants.CREATE_REQUEST:
      return { creating: true };
    case outlineEvaluationConstants.CREATE_SUCCESS:
      return { createdOutline: action.createdOutline };
    case outlineEvaluationConstants.CREATE_FAILURE:
      return { error: action.error };

    case outlineEvaluationConstants.GET_REQUEST:
      return { getting: true };
    case outlineEvaluationConstants.GET_SUCCESS:
      return { data: action.outlineEvaluation };
    case outlineEvaluationConstants.GET_FAILURE:
      return { error: action.error };

    case outlineEvaluationConstants.GET_ALL_REQUEST:
      return { getting: true };
    case outlineEvaluationConstants.GET_ALL_SUCCESS:
      return { outlineEvaluations: action.outlineEvaluations };
    case outlineEvaluationConstants.GET_ALL_FAILURE:
      return { error: action.error };

    case outlineEvaluationConstants.UPDATE_REQUEST:
      return { getting: true };
    case outlineEvaluationConstants.UPDATE_SUCCESS:
      return { data: action.updatedOutline };
    case outlineEvaluationConstants.UPDATE_FAILURE:
      return { error: action.error };

    case outlineEvaluationConstants.DELETE_REQUEST:
      return { deleting: true };
    case outlineEvaluationConstants.DELETE_SUCCESS:
      return { };
    case outlineEvaluationConstants.DELETE_FAILURE:
      return {};

    default:
      return state;
  }
}

export default outlineEvaluation;
