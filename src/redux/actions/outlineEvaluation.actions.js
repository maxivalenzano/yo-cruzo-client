import { outlineEvaluationConstants } from '../../constants';
import { outlineEvaluationService } from '../../services';
import alertActions from './alert.actions';

function create(outlineEvaluation, redirectUrl = null) {
  function request(outlineEvaluationToCreate) {
    return {
      type: outlineEvaluationConstants.CREATE_REQUEST, outlineEvaluationToCreate,
    };
  }
  function success(createdOutlineEvaluation) {
    return {
      type: outlineEvaluationConstants.CREATE_SUCCESS, createdOutlineEvaluation,
    };
  }
  function failure(error) { return { type: outlineEvaluationConstants.CREATE_FAILURE, error }; }

  return (dispatch) => {
    dispatch(request(outlineEvaluation));

    outlineEvaluationService.create(outlineEvaluation)
      .then(
        (createdOutlineEvaluation) => {
          dispatch(success(createdOutlineEvaluation));
        },
        (error) => {
          dispatch(failure(error));
        },
      );
  };
}

function get(id) {
  function request() { return { type: outlineEvaluationConstants.GET_REQUEST }; }
  function success(outlineEvaluation) {
    return { type: outlineEvaluationConstants.GET_SUCCESS, outlineEvaluation };
  }
  function failure(error) { return { type: outlineEvaluationConstants.GET_FAILURE, error }; }

  return (dispatch) => {
    dispatch(request());

    outlineEvaluationService.get(id)
      .then(
        (outlineEvaluation) => {
          dispatch(success(outlineEvaluation));
        },
        (error) => {
          dispatch(failure(error));
          dispatch(alertActions.error(error));
        },
      );
  };
}

function getAll() {
  function request() { return { type: outlineEvaluationConstants.GET_ALL_REQUEST }; }
  function success(outlineEvaluations) {
    return { type: outlineEvaluationConstants.GET_ALL_SUCCESS, outlineEvaluations };
  }
  function failure(error) { return { type: outlineEvaluationConstants.GET_ALL_FAILURE, error }; }

  return (dispatch) => {
    dispatch(request());

    outlineEvaluationService.getAll()
      .then(
        (outlineEvaluations) => {
          dispatch(success(outlineEvaluations));
        },
        (error) => {
          dispatch(failure(error));
        },
      );
  };
}

function update(outlineEvaluation, redirectUrl = null) {
  function request(outlineEvaluationToUpdate) {
    return {
      type: outlineEvaluationConstants.UPDATE_REQUEST, outlineEvaluationToUpdate,
    };
  }
  function success(updatedOutlineEvaluation) {
    return {
      type: outlineEvaluationConstants.UPDATE_SUCCESS, updatedOutlineEvaluation,
    };
  }
  function failure(error) { return { type: outlineEvaluationConstants.UPDATE_FAILURE, error }; }

  return (dispatch) => {
    dispatch(request(outlineEvaluation));

    outlineEvaluationService.update(outlineEvaluation)
      .then(
        (updatedOutlineEvaluation) => {
          dispatch(success(updatedOutlineEvaluation));
        },
        (error) => {
          dispatch(failure(error));
        },
      );
  };
}

function deleteOutlineEvaluation(outlineEvaluationId) {
  function request() { return { type: outlineEvaluationConstants.DELETE_REQUEST }; }
  function success() { return { type: outlineEvaluationConstants.DELETE_SUCCESS }; }
  function failure() { return { type: outlineEvaluationConstants.DELETE_FAILURE }; }

  return (dispatch) => {
    dispatch(request());

    outlineEvaluationService.deleteOutlineEvaluation(outlineEvaluationId)
      .then(
        () => {
          dispatch(success());
        },
        (error) => {
          dispatch(failure(error));
        },
      );
  };
}

const outlineEvaluationActions = {
  create,
  get,
  getAll,
  update,
  deleteOutlineEvaluation,
};

export default outlineEvaluationActions;
