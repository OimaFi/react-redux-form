'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createControlClass = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactRedux = require('react-redux');

var _redux = require('redux');

var _identity = require('../utils/identity');

var _identity2 = _interopRequireDefault(_identity);

var _shallowEqual = require('../utils/shallow-equal');

var _shallowEqual2 = _interopRequireDefault(_shallowEqual);

var _get2 = require('../utils/get');

var _get3 = _interopRequireDefault(_get2);

var _merge = require('../utils/merge');

var _merge2 = _interopRequireDefault(_merge);

var _mapValues = require('../utils/map-values');

var _mapValues2 = _interopRequireDefault(_mapValues);

var _isPlainObject = require('../utils/is-plain-object');

var _isPlainObject2 = _interopRequireDefault(_isPlainObject);

var _icepick = require('icepick');

var _icepick2 = _interopRequireDefault(_icepick);

var _omit = require('../utils/omit');

var _omit2 = _interopRequireDefault(_omit);

var _actionTypes = require('../action-types');

var _actionTypes2 = _interopRequireDefault(_actionTypes);

var _debounce = require('../utils/debounce');

var _debounce2 = _interopRequireDefault(_debounce);

var _getValue2 = require('../utils/get-value');

var _getValue3 = _interopRequireDefault(_getValue2);

var _getValidity = require('../utils/get-validity');

var _getValidity2 = _interopRequireDefault(_getValidity);

var _invertValidity = require('../utils/invert-validity');

var _invertValidity2 = _interopRequireDefault(_invertValidity);

var _getModel = require('../utils/get-model');

var _getModel2 = _interopRequireDefault(_getModel);

var _persistEventWithCallback = require('../utils/persist-event-with-callback');

var _persistEventWithCallback2 = _interopRequireDefault(_persistEventWithCallback);

var _actions = require('../actions');

var _actions2 = _interopRequireDefault(_actions);

var _controlPropsMap = require('../constants/control-props-map');

var _controlPropsMap2 = _interopRequireDefault(_controlPropsMap);

var _validityKeys = require('../constants/validity-keys');

var _validityKeys2 = _interopRequireDefault(_validityKeys);

var _batchActions = require('../actions/batch-actions');

var _resolveModel = require('../utils/resolve-model');

var _resolveModel2 = _interopRequireDefault(_resolveModel);

var _isNative = require('../utils/is-native');

var _isNative2 = _interopRequireDefault(_isNative);

var _initialFieldState = require('../constants/initial-field-state');

var _initialFieldState2 = _interopRequireDefault(_initialFieldState);

var _containsEvent = require('../utils/contains-event');

var _containsEvent2 = _interopRequireDefault(_containsEvent);

var _errorsComponent = require('./errors-component');

var _controlStripDefaultsComponent = require('./control-strip-defaults-component');

var _controlStripDefaultsComponent2 = _interopRequireDefault(_controlStripDefaultsComponent);

var _getForm = require('../utils/get-form');

var _getForm2 = _interopRequireDefault(_getForm);

var _isValid = require('../form/is-valid');

var _isValid2 = _interopRequireDefault(_isValid);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var disallowedProps = ['changeAction', 'getFieldFromState', 'store'];

function mergeOrSetErrors(model, errors, options) {
  return _actions2.default.setErrors(model, errors, _extends({
    merge: (0, _isPlainObject.isObjectLike)(errors)
  }, options));
}

var propTypes = {
  model: _propTypes2.default.oneOfType([_propTypes2.default.func, _propTypes2.default.string, _propTypes2.default.array]).isRequired,
  modelValue: _propTypes2.default.any,
  viewValue: _propTypes2.default.any,
  defaultValue: _propTypes2.default.any,
  control: _propTypes2.default.any,
  onLoad: _propTypes2.default.func,
  onSubmit: _propTypes2.default.func,
  fieldValue: _propTypes2.default.object,
  mapProps: _propTypes2.default.oneOfType([_propTypes2.default.func, _propTypes2.default.object]),
  changeAction: _propTypes2.default.func,
  updateOn: _propTypes2.default.oneOfType([_propTypes2.default.arrayOf(_propTypes2.default.string), _propTypes2.default.string]),
  validateOn: _propTypes2.default.oneOfType([_propTypes2.default.arrayOf(_propTypes2.default.string), _propTypes2.default.string]),
  validators: _propTypes2.default.oneOfType([_propTypes2.default.func, _propTypes2.default.object]),
  asyncValidateOn: _propTypes2.default.oneOfType([_propTypes2.default.arrayOf(_propTypes2.default.string), _propTypes2.default.string]),
  asyncValidators: _propTypes2.default.oneOfType([_propTypes2.default.func, _propTypes2.default.object]),
  errors: _propTypes2.default.oneOfType([_propTypes2.default.func, _propTypes2.default.object]),
  controlProps: _propTypes2.default.object,
  component: _propTypes2.default.any,
  dispatch: _propTypes2.default.func,
  parser: _propTypes2.default.func,
  formatter: _propTypes2.default.func,
  ignore: _propTypes2.default.oneOfType([_propTypes2.default.arrayOf(_propTypes2.default.string), _propTypes2.default.string]),
  dynamic: _propTypes2.default.bool,
  store: _propTypes2.default.shape({
    subscribe: _propTypes2.default.func,
    dispatch: _propTypes2.default.func,
    getState: _propTypes2.default.func
  }),
  getRef: _propTypes2.default.func,
  withField: _propTypes2.default.bool,
  debounce: _propTypes2.default.number,
  persist: _propTypes2.default.bool,
  getValue: _propTypes2.default.func,
  isToggle: _propTypes2.default.bool,
  updateOnEnter: _propTypes2.default.bool,
  render: _propTypes2.default.func,

  // HTML5 attributes
  formNoValidate: _propTypes2.default.bool
};

var htmlAttributes = ['formNoValidate'];
var disallowedPropTypeKeys = Object.keys(propTypes).filter(function (key) {
  return htmlAttributes.indexOf(key) === -1;
});

function createControlClass(s) {
  var emptyControlProps = {};
  var emptyMapProps = {};

  var Control = function (_Component) {
    _inherits(Control, _Component);

    function Control(props) {
      _classCallCheck(this, Control);

      var _this = _possibleConstructorReturn(this, (Control.__proto__ || Object.getPrototypeOf(Control)).call(this, props));

      _this.getChangeAction = _this.getChangeAction.bind(_this);
      _this.getValidateAction = _this.getValidateAction.bind(_this);

      _this.handleKeyPress = _this.handleKeyPress.bind(_this);
      _this.createEventHandler = _this.createEventHandler.bind(_this);
      _this.handleFocus = _this.createEventHandler('focus').bind(_this);
      _this.handleBlur = _this.createEventHandler('blur').bind(_this);
      _this.handleUpdate = _this.createEventHandler('change').bind(_this);
      _this.forceHandleUpdate = _this.createEventHandler('change', true).bind(_this);
      _this.handleChange = _this.handleChange.bind(_this);
      _this.handleLoad = _this.handleLoad.bind(_this);
      _this.getMappedProps = _this.getMappedProps.bind(_this);
      _this.getRenderProps = _this.getRenderProps.bind(_this);
      _this.attachNode = _this.attachNode.bind(_this);

      if (props.debounce) {
        _this.handleUpdate = (0, _debounce2.default)(_this.handleUpdate, props.debounce);
        var oldHandleBlur = _this.handleBlur;
        _this.handleBlur = function () {
          for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this.handleUpdate.flush();
          oldHandleBlur.call.apply(oldHandleBlur, [_this].concat(args));
        };
      }

      _this.willValidate = false;

      _this.state = {
        viewValue: _this.format(props.modelValue)
      };
      return _this;
    }

    _createClass(Control, [{
      key: 'componentDidMount',
      value: function componentDidMount() {
        this.attachNode();
        this.handleLoad();
      }
    }, {
      key: 'shouldComponentUpdate',
      value: function shouldComponentUpdate(nextProps, nextState) {
        return !(0, _shallowEqual2.default)(this.props, nextProps, {
          deepKeys: ['controlProps'],
          omitKeys: ['mapProps']
        }) || !(0, _shallowEqual2.default)(this.state.viewValue, nextState.viewValue);
      }
    }, {
      key: 'componentDidUpdate',
      value: function componentDidUpdate() {
        this.handleIntents();
      }
    }, {
      key: 'componentWillUnmount',
      value: function componentWillUnmount() {
        var _props = this.props,
            model = _props.model,
            fieldValue = _props.fieldValue,
            dispatch = _props.dispatch,
            _props$validators = _props.validators,
            validators = _props$validators === undefined ? {} : _props$validators,
            _props$errors = _props.errors,
            errors = _props$errors === undefined ? {} : _props$errors,
            persist = _props.persist;


        if (!persist && fieldValue && !fieldValue.valid) {
          var keys = Object.keys(validators).concat(Object.keys(errors), this.willValidate ? _validityKeys2.default : []);

          dispatch(_actions2.default.resetValidity(model, keys));
        }

        // flush debounced model changes
        if (this.handleUpdate.flush) {
          this.handleUpdate.flush();
        }
      }
    }, {
      key: 'getRenderProps',
      value: function getRenderProps() {
        var props = this.props;
        var viewValue = this.state.viewValue;

        return {
          modelValue: props.modelValue,
          fieldValue: props.fieldValue,
          onFocus: this.handleFocus,
          onBlur: this.handleBlur,
          onChange: this.handleChange,
          onKeyPress: this.handleKeyPress,
          viewValue: viewValue
        };
      }
    }, {
      key: 'getMappedProps',
      value: function getMappedProps() {
        var props = this.props;
        var mapProps = props.mapProps;
        var viewValue = this.state.viewValue;

        var originalProps = _extends({}, props, props.controlProps, {
          onFocus: this.handleFocus,
          onBlur: this.handleBlur,
          onChange: this.handleChange,
          onKeyPress: this.handleKeyPress,
          viewValue: viewValue
        });

        if ((0, _isPlainObject2.default)(mapProps)) {
          return (0, _mapValues2.default)(mapProps, function (value, key) {
            if (typeof value === 'function' && key !== 'component') {
              return value(originalProps);
            }

            return value;
          });
        } else if (typeof mapProps === 'function') {
          return mapProps(originalProps);
        }

        return emptyMapProps;
      }
    }, {
      key: 'getChangeAction',
      value: function getChangeAction(event) {
        return this.props.changeAction(this.props.model, this.getValue(event), {
          currentValue: this.props.modelValue,
          external: false
        });
      }
    }, {
      key: 'getValidateAction',
      value: function getValidateAction(value, eventName) {
        var forceUpdate = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
        var _props2 = this.props,
            validators = _props2.validators,
            errors = _props2.errors,
            model = _props2.model,
            modelValue = _props2.modelValue,
            updateOn = _props2.updateOn,
            fieldValue = _props2.fieldValue;


        if (!validators && !errors && !this.willValidate) return false;

        var nodeErrors = this.getNodeErrors();

        // If it is not a change event, use the model value.
        var valueToValidate = forceUpdate || (0, _containsEvent2.default)(updateOn, eventName) ? value : modelValue;

        if (validators || errors) {
          var fieldValidity = (0, _getValidity2.default)(validators, valueToValidate);
          var fieldErrors = (0, _merge2.default)((0, _getValidity2.default)(errors, valueToValidate), nodeErrors);

          var mergedErrors = validators ? (0, _merge2.default)((0, _invertValidity2.default)(fieldValidity), fieldErrors) : fieldErrors;

          if (!fieldValue || !(0, _shallowEqual2.default)(mergedErrors, fieldValue.errors)) {
            return mergeOrSetErrors(model, mergedErrors);
          }
        } else if (nodeErrors && Object.keys(nodeErrors).length) {
          return mergeOrSetErrors(model, nodeErrors);
        }

        return false;
      }
    }, {
      key: 'getAsyncValidateAction',
      value: function getAsyncValidateAction(value, eventName) {
        var _this2 = this;

        var _props3 = this.props,
            asyncValidators = _props3.asyncValidators,
            fieldValue = _props3.fieldValue,
            model = _props3.model,
            modelValue = _props3.modelValue,
            updateOn = _props3.updateOn,
            _props3$validateOn = _props3.validateOn,
            validateOn = _props3$validateOn === undefined ? updateOn : _props3$validateOn,
            asyncValidateOn = _props3.asyncValidateOn,
            dispatch = _props3.dispatch,
            getValue = _props3.getValue;

        // If there are no async validators,
        // do not run async validation

        if (!asyncValidators) return false;

        // If it is not a change event, use the model value.
        var valueToValidate = (0, _containsEvent2.default)(updateOn, eventName) ? value : modelValue;

        // If any sync validity is invalid,
        // do not run async validation
        // unless sync and async validation occur simultaneously
        if (validateOn !== asyncValidateOn) {
          var asyncValidatorKeys = Object.keys(asyncValidators);
          var syncValid = Object.keys(fieldValue.validity).every(function (key) {
            // If validity is based on async validator, skip
            if (!!~asyncValidatorKeys.indexOf(key)) return true;

            return fieldValue.validity[key];
          });

          if (!syncValid) return false;
        }

        dispatch(_actions2.default.setValidating(model, true));

        (0, _mapValues2.default)(asyncValidators, function (validator, key) {
          var outerDone = function outerDone(valid) {
            // get current fieldValue as another validator may have already been processed.
            var currentFieldValue = _this2.props.fieldValue;
            var validity = _icepick2.default.merge(currentFieldValue.validity, _defineProperty({}, key, valid));

            dispatch(_actions2.default.setValidity(model, validity));
          };

          validator(getValue(valueToValidate, _this2.props), outerDone);
        });

        return valueToValidate;
      }
    }, {
      key: 'getNodeErrors',
      value: function getNodeErrors() {
        var node = this.node,
            _props4 = this.props,
            fieldValue = _props4.fieldValue,
            formNoValidate = _props4.formNoValidate;


        if (formNoValidate || !node || node && !node.willValidate) {
          this.willValidate = false;
          return null;
        }

        this.willValidate = true;

        var nodeErrors = {};

        _validityKeys2.default.forEach(function (key) {
          var errorValidity = node.validity[key];

          // If the key is invalid or they key was
          // previously invalid and is now valid,
          // set its validity
          if (errorValidity || fieldValue && fieldValue.errors[key]) {
            nodeErrors[key] = errorValidity;
          }
        });

        return nodeErrors;
      }
    }, {
      key: 'setViewValue',
      value: function setViewValue(viewValue) {
        if (!this.props.isToggle) {
          if (this.props.formatter) {
            var parsedValue = this.parse(viewValue);
            this.setState({ viewValue: this.format(parsedValue) });
          } else {
            this.setState({ viewValue: this.parse(viewValue) });
          }
        }
      }
    }, {
      key: 'getValue',
      value: function getValue(event) {
        return this.props.getValue(event, this.props);
      }

      /* eslint-disable camelcase */

    }, {
      key: 'UNSAFE_componentWillReceiveProps',
      value: function UNSAFE_componentWillReceiveProps(_ref) {
        var modelValue = _ref.modelValue;

        if (modelValue !== this.props.modelValue) {
          this.setViewValue(modelValue);
        }
      }
    }, {
      key: 'handleIntents',
      value: function handleIntents() {
        var _this3 = this;

        var _props5 = this.props,
            model = _props5.model,
            modelValue = _props5.modelValue,
            fieldValue = _props5.fieldValue,
            intents = _props5.fieldValue.intents,
            controlProps = _props5.controlProps,
            dispatch = _props5.dispatch,
            updateOn = _props5.updateOn,
            _props5$validateOn = _props5.validateOn,
            validateOn = _props5$validateOn === undefined ? updateOn : _props5$validateOn;


        if (!Array.isArray(intents) || !intents.length) return;

        intents.forEach(function (intent) {
          switch (intent.type) {
            case _actionTypes2.default.FOCUS:
              {
                if (_isNative2.default) return;

                var focused = fieldValue.focus;

                if (focused && _this3.node.focus && (!_this3.props.isToggle || typeof intent.value === 'undefined' || intent.value === controlProps.value)) {
                  _this3.node.focus();

                  dispatch(_actions2.default.clearIntents(model, intent));
                }

                return;
              }
            case 'validate':
              if ((0, _containsEvent2.default)(validateOn, 'change')) {
                _this3.validate({ clearIntents: intent });
              }
              return;
            case 'reset':
              _this3.setViewValue(modelValue);
              if (_this3.handleUpdate.cancel) {
                _this3.handleUpdate.cancel();
              }
              dispatch(_actions2.default.clearIntents(model, intent));
              if ((0, _containsEvent2.default)(validateOn, 'change')) {
                _this3.validate({});
              }
              return;

            case 'load':
              if (!(0, _shallowEqual2.default)(modelValue, fieldValue.value)) {
                dispatch(_actions2.default.load(model, fieldValue.value, { clearIntents: intent }));
              }
              return;

            default:
              return;
          }
        });
      }
    }, {
      key: 'parse',
      value: function parse(value) {
        return this.props.parser ? this.props.parser(value) : value;
      }
    }, {
      key: 'format',
      value: function format(value) {
        return this.props.formatter ? this.props.formatter(value) : value;
      }
    }, {
      key: 'handleChange',
      value: function handleChange(event) {
        if (event && event.persist) event.persist();

        this.setViewValue(this.getValue(event));
        this.handleUpdate(event);
      }
    }, {
      key: 'handleKeyPress',
      value: function handleKeyPress(event) {
        var _props6 = this.props,
            onKeyPress = _props6.controlProps.onKeyPress,
            updateOnEnter = _props6.updateOnEnter;


        if (onKeyPress) onKeyPress(event);

        if (updateOnEnter && event.key === 'Enter') {
          this.forceHandleUpdate(event);
        }
      }
    }, {
      key: 'handleLoad',
      value: function handleLoad() {
        var _props7 = this.props,
            model = _props7.model,
            modelValue = _props7.modelValue,
            fieldValue = _props7.fieldValue,
            controlProps = _props7.controlProps,
            onLoad = _props7.onLoad,
            dispatch = _props7.dispatch,
            changeAction = _props7.changeAction,
            parser = _props7.parser;

        var defaultValue = undefined;

        if (controlProps.hasOwnProperty('defaultValue')) {
          defaultValue = controlProps.defaultValue;
        } else if (controlProps.hasOwnProperty('defaultChecked')) {
          defaultValue = controlProps.defaultChecked;
        } else if (this.props.hasOwnProperty('defaultValue')) {
          defaultValue = this.props.defaultValue;
        }

        var loadActions = [this.getValidateAction(defaultValue)];

        if (typeof defaultValue !== 'undefined') {
          loadActions.push(changeAction(model, defaultValue));
        } else {
          if (parser) {
            var parsedValue = parser(modelValue);

            if (parsedValue !== modelValue) {
              loadActions.push(changeAction(model, parsedValue));
            }
          }
        }

        (0, _batchActions.dispatchBatchIfNeeded)(model, loadActions, dispatch);

        if (onLoad) onLoad(modelValue, fieldValue, this.node);
      }
    }, {
      key: 'createEventHandler',
      value: function createEventHandler(eventName) {
        var _this4 = this;

        var forceUpdate = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

        var eventAction = {
          focus: _actions2.default.silentFocus,
          blur: _actions2.default.blur
        }[eventName];

        var dispatchBatchActions = function dispatchBatchActions(persistedEvent) {
          var _props8 = _this4.props,
              dispatch = _props8.dispatch,
              model = _props8.model,
              updateOn = _props8.updateOn,
              _props8$validateOn = _props8.validateOn,
              validateOn = _props8$validateOn === undefined ? updateOn : _props8$validateOn,
              asyncValidateOn = _props8.asyncValidateOn;


          var eventActions = [eventAction && eventAction(model), (forceUpdate || (0, _containsEvent2.default)(validateOn, eventName)) && _this4.getValidateAction(persistedEvent, eventName, forceUpdate), (forceUpdate || (0, _containsEvent2.default)(asyncValidateOn, eventName)) && _this4.getAsyncValidateAction(persistedEvent, eventName), (forceUpdate || (0, _containsEvent2.default)(updateOn, eventName)) && _this4.getChangeAction(persistedEvent)];

          (0, _batchActions.dispatchBatchIfNeeded)(model, eventActions, dispatch);

          return persistedEvent;
        };

        return function (event) {
          var _props9 = _this4.props,
              controlProps = _props9.controlProps,
              parser = _props9.parser,
              ignore = _props9.ignore,
              withField = _props9.withField,
              fieldValue = _props9.fieldValue;


          var controlEventHandler = {
            focus: controlProps.onFocus,
            blur: controlProps.onBlur,
            change: controlProps.onChange
          }[eventName];

          if ((0, _containsEvent2.default)(ignore, eventName)) {
            return controlEventHandler ? controlEventHandler(event) : event;
          }

          if (_this4.props.isToggle) {
            return (0, _redux.compose)(dispatchBatchActions, (0, _persistEventWithCallback2.default)(controlEventHandler || _identity2.default))(event);
          }

          return (0, _redux.compose)(dispatchBatchActions, parser, function (e) {
            return _this4.getValue(e);
          }, (0, _persistEventWithCallback2.default)(controlEventHandler || _identity2.default))(event, withField ? fieldValue : undefined);
        };
      }
    }, {
      key: 'attachNode',
      value: function attachNode() {
        var node = s.findDOMNode && s.findDOMNode(this);

        if (node) {
          this.node = node;
          this.willValidate = node.willValidate;
        }
      }
    }, {
      key: 'validate',
      value: function validate(options) {
        var _props10 = this.props,
            model = _props10.model,
            modelValue = _props10.modelValue,
            fieldValue = _props10.fieldValue,
            validators = _props10.validators,
            errorValidators = _props10.errors,
            dispatch = _props10.dispatch;


        if (!validators && !errorValidators && !this.willValidate || !fieldValue) {
          return;
        }

        var fieldValidity = (0, _getValidity2.default)(validators, modelValue);
        var fieldErrors = (0, _getValidity2.default)(errorValidators, modelValue);
        var nodeErrors = this.getNodeErrors();

        var errors = validators ? (0, _merge2.default)((0, _invertValidity2.default)(fieldValidity), fieldErrors) : fieldErrors;

        if (this.willValidate) {
          errors = (0, _merge2.default)(errors, nodeErrors);
        }

        if (!(0, _shallowEqual2.default)(errors, fieldValue.errors)) {
          dispatch(mergeOrSetErrors(model, errors, options));
        } else if (options.clearIntents) {
          dispatch(_actions2.default.clearIntents(model, options.clearIntents));
        }
      }
    }, {
      key: 'render',
      value: function render() {
        var _props11 = this.props,
            render = _props11.render,
            controlProps = _props11.controlProps,
            component = _props11.component,
            control = _props11.control,
            getRef = _props11.getRef,
            fieldValue = _props11.fieldValue;


        if (render) {
          return render(this.getRenderProps());
        }

        var mappedProps = (0, _omit2.default)(this.getMappedProps(), disallowedProps);

        if (getRef) {
          mappedProps.getRef = getRef;
        }

        if (controlProps.withFieldValue) {
          mappedProps.fieldValue = fieldValue;
        }

        var hasErrors = controlProps.hasErrors;

        // If there is an existing control, clone it
        if (control) {
          return (0, _react.cloneElement)(control, _extends({}, mappedProps, {
            'aria-invalid': hasErrors
          }, hasErrors && { 'aria-describedby': this.props.model + 'Error' }, {
            defaultValue: undefined,
            defaultChecked: undefined
          }), controlProps.children);
        }
        return (0, _react.createElement)(_controlStripDefaultsComponent2.default, _extends({
          component: component
        }, controlProps, mappedProps, {
          'aria-invalid': hasErrors
        }, hasErrors && { 'aria-describedby': this.props.model + 'Error' }));
      }
    }]);

    return Control;
  }(_react.Component);

  Control.displayName = 'Control';

  process.env.NODE_ENV !== "production" ? Control.propTypes = propTypes : void 0;

  Control.defaultProps = {
    changeAction: s.actions.change,
    updateOn: 'change',
    asyncValidateOn: 'blur',
    parser: _identity2.default,
    controlProps: emptyControlProps,
    ignore: [],
    dynamic: false,
    component: 'input',
    withField: true,
    persist: false,
    getValue: _getValue3.default,
    isToggle: false,
    updateOnEnter: true
  };

  function mapStateToProps(state, props) {
    var model = props.model,
        controlProps = props.controlProps;


    var modelString = (0, _getModel2.default)(model, state);
    var fieldValue = s.getFieldFromState(state, modelString) || _initialFieldState2.default;
    var modelValue = s.get(state, modelString);
    var form = (0, _getForm2.default)(state, modelString);
    var show = !fieldValue.pristine && fieldValue.touched || fieldValue.submitFailed;

    var finalControlProps = _extends({}, controlProps, (0, _omit2.default)(props, disallowedPropTypeKeys), {
      hasErrors: !(0, _isValid2.default)(fieldValue) && (0, _errorsComponent.showErrors)(fieldValue, form.$form, show)
    });

    return {
      model: modelString,
      modelValue: modelValue,
      fieldValue: fieldValue,
      controlProps: finalControlProps
    };
  }

  var ConnectedControl = (0, _resolveModel2.default)((0, _reactRedux.connect)(mapStateToProps, null, null, {
    areOwnPropsEqual: function areOwnPropsEqual(nextOwnProps, ownProps) {
      return (0, _shallowEqual2.default)(nextOwnProps, ownProps, {
        omitKeys: ['mapProps']
      });
    },
    areStatePropsEqual: function areStatePropsEqual(nextStateProps, stateProps) {
      return (0, _shallowEqual2.default)(nextStateProps, stateProps, {
        deepKeys: ['controlProps']
      });
    }
  })(Control));

  /* eslint-disable react/prop-types */
  /* eslint-disable react/no-multi-comp */

  var DefaultConnectedControl = function (_React$Component) {
    _inherits(DefaultConnectedControl, _React$Component);

    function DefaultConnectedControl() {
      _classCallCheck(this, DefaultConnectedControl);

      return _possibleConstructorReturn(this, (DefaultConnectedControl.__proto__ || Object.getPrototypeOf(DefaultConnectedControl)).apply(this, arguments));
    }

    _createClass(DefaultConnectedControl, [{
      key: 'shouldComponentUpdate',
      value: function shouldComponentUpdate(nextProps, nextState, nextContext) {
        return !(0, _shallowEqual2.default)(this.context, nextContext) || !(0, _shallowEqual2.default)(this.props, nextProps, {
          deepKeys: ['controlProps'],
          omitKeys: ['mapProps']
        });
      }
    }, {
      key: 'render',
      value: function render() {
        return _react2.default.createElement(ConnectedControl, _extends({}, this.props, {
          mapProps: _extends({}, _controlPropsMap2.default.default, this.props.mapProps)
        }));
      }
    }]);

    return DefaultConnectedControl;
  }(_react2.default.Component);

  // Copy the context types so that we can properly implement shouldComponentUpdate


  DefaultConnectedControl.contextTypes = ConnectedControl.contextTypes;

  DefaultConnectedControl.custom = ConnectedControl;

  var DefaultConnectedControlInput = function (_DefaultConnectedCont) {
    _inherits(DefaultConnectedControlInput, _DefaultConnectedCont);

    function DefaultConnectedControlInput() {
      _classCallCheck(this, DefaultConnectedControlInput);

      return _possibleConstructorReturn(this, (DefaultConnectedControlInput.__proto__ || Object.getPrototypeOf(DefaultConnectedControlInput)).apply(this, arguments));
    }

    _createClass(DefaultConnectedControlInput, [{
      key: 'render',
      value: function render() {
        return _react2.default.createElement(ConnectedControl, _extends({
          component: 'input'
        }, this.props, {
          mapProps: _extends({}, _controlPropsMap2.default.default, this.props.mapProps)
        }));
      }
    }]);

    return DefaultConnectedControlInput;
  }(DefaultConnectedControl);

  DefaultConnectedControl.input = DefaultConnectedControlInput;

  var DefaultConnectedControlText = function (_DefaultConnectedCont2) {
    _inherits(DefaultConnectedControlText, _DefaultConnectedCont2);

    function DefaultConnectedControlText() {
      _classCallCheck(this, DefaultConnectedControlText);

      return _possibleConstructorReturn(this, (DefaultConnectedControlText.__proto__ || Object.getPrototypeOf(DefaultConnectedControlText)).apply(this, arguments));
    }

    _createClass(DefaultConnectedControlText, [{
      key: 'render',
      value: function render() {
        return _react2.default.createElement(ConnectedControl, _extends({
          component: 'input'
        }, this.props, {
          mapProps: _extends({}, _controlPropsMap2.default.text, {
            type: this.props.type || 'text'
          }, this.props.mapProps)
        }));
      }
    }]);

    return DefaultConnectedControlText;
  }(DefaultConnectedControl);

  DefaultConnectedControl.text = DefaultConnectedControlText;

  var DefaultConnectedControlPassword = function (_DefaultConnectedCont3) {
    _inherits(DefaultConnectedControlPassword, _DefaultConnectedCont3);

    function DefaultConnectedControlPassword() {
      _classCallCheck(this, DefaultConnectedControlPassword);

      return _possibleConstructorReturn(this, (DefaultConnectedControlPassword.__proto__ || Object.getPrototypeOf(DefaultConnectedControlPassword)).apply(this, arguments));
    }

    _createClass(DefaultConnectedControlPassword, [{
      key: 'render',
      value: function render() {
        return _react2.default.createElement(ConnectedControl, _extends({
          component: 'input'
        }, this.props, {
          mapProps: _extends({}, _controlPropsMap2.default.text, {
            type: this.props.type || 'password'
          }, this.props.mapProps)
        }));
      }
    }]);

    return DefaultConnectedControlPassword;
  }(DefaultConnectedControl);

  DefaultConnectedControl.password = DefaultConnectedControlPassword;

  var DefaultConnectedControlTextArea = function (_DefaultConnectedCont4) {
    _inherits(DefaultConnectedControlTextArea, _DefaultConnectedCont4);

    function DefaultConnectedControlTextArea() {
      _classCallCheck(this, DefaultConnectedControlTextArea);

      return _possibleConstructorReturn(this, (DefaultConnectedControlTextArea.__proto__ || Object.getPrototypeOf(DefaultConnectedControlTextArea)).apply(this, arguments));
    }

    _createClass(DefaultConnectedControlTextArea, [{
      key: 'render',
      value: function render() {
        return _react2.default.createElement(ConnectedControl, _extends({
          component: 'textarea',
          updateOnEnter: false
        }, this.props, {
          mapProps: _extends({}, _controlPropsMap2.default.textarea, this.props.mapProps)
        }));
      }
    }]);

    return DefaultConnectedControlTextArea;
  }(DefaultConnectedControl);

  DefaultConnectedControl.textarea = DefaultConnectedControlTextArea;

  var DefaultConnectedControlRadio = function (_DefaultConnectedCont5) {
    _inherits(DefaultConnectedControlRadio, _DefaultConnectedCont5);

    function DefaultConnectedControlRadio() {
      _classCallCheck(this, DefaultConnectedControlRadio);

      return _possibleConstructorReturn(this, (DefaultConnectedControlRadio.__proto__ || Object.getPrototypeOf(DefaultConnectedControlRadio)).apply(this, arguments));
    }

    _createClass(DefaultConnectedControlRadio, [{
      key: 'render',
      value: function render() {
        return _react2.default.createElement(ConnectedControl, _extends({
          component: 'input',
          type: 'radio',
          isToggle: true
        }, this.props, {
          mapProps: _extends({}, _controlPropsMap2.default.radio, this.props.mapProps)
        }));
      }
    }]);

    return DefaultConnectedControlRadio;
  }(DefaultConnectedControl);

  DefaultConnectedControl.radio = DefaultConnectedControlRadio;

  var DefaultConnectedControlCheckbox = function (_DefaultConnectedCont6) {
    _inherits(DefaultConnectedControlCheckbox, _DefaultConnectedCont6);

    function DefaultConnectedControlCheckbox() {
      _classCallCheck(this, DefaultConnectedControlCheckbox);

      return _possibleConstructorReturn(this, (DefaultConnectedControlCheckbox.__proto__ || Object.getPrototypeOf(DefaultConnectedControlCheckbox)).apply(this, arguments));
    }

    _createClass(DefaultConnectedControlCheckbox, [{
      key: 'render',
      value: function render() {
        return _react2.default.createElement(ConnectedControl, _extends({
          component: 'input',
          type: 'checkbox',
          isToggle: true
        }, this.props, {
          mapProps: _extends({}, _controlPropsMap2.default.checkbox, this.props.mapProps),
          getValue: _getValue2.getCheckboxValue,
          changeAction: this.props.changeAction || s.actions.checkWithValue
        }));
      }
    }]);

    return DefaultConnectedControlCheckbox;
  }(DefaultConnectedControl);

  DefaultConnectedControl.checkbox = DefaultConnectedControlCheckbox;

  var DefaultConnectedControlFile = function (_DefaultConnectedCont7) {
    _inherits(DefaultConnectedControlFile, _DefaultConnectedCont7);

    function DefaultConnectedControlFile() {
      _classCallCheck(this, DefaultConnectedControlFile);

      return _possibleConstructorReturn(this, (DefaultConnectedControlFile.__proto__ || Object.getPrototypeOf(DefaultConnectedControlFile)).apply(this, arguments));
    }

    _createClass(DefaultConnectedControlFile, [{
      key: 'render',
      value: function render() {
        return _react2.default.createElement(ConnectedControl, _extends({
          component: 'input',
          type: 'file'
        }, this.props, {
          mapProps: _extends({}, _controlPropsMap2.default.file, this.props.mapProps)
        }));
      }
    }]);

    return DefaultConnectedControlFile;
  }(DefaultConnectedControl);

  DefaultConnectedControl.file = DefaultConnectedControlFile;

  var DefaultConnectedControlSelect = function (_DefaultConnectedCont8) {
    _inherits(DefaultConnectedControlSelect, _DefaultConnectedCont8);

    function DefaultConnectedControlSelect() {
      _classCallCheck(this, DefaultConnectedControlSelect);

      return _possibleConstructorReturn(this, (DefaultConnectedControlSelect.__proto__ || Object.getPrototypeOf(DefaultConnectedControlSelect)).apply(this, arguments));
    }

    _createClass(DefaultConnectedControlSelect, [{
      key: 'render',
      value: function render() {
        return _react2.default.createElement(ConnectedControl, _extends({
          component: 'select'
        }, this.props, {
          mapProps: _extends({}, _controlPropsMap2.default.select, this.props.mapProps)
        }));
      }
    }]);

    return DefaultConnectedControlSelect;
  }(DefaultConnectedControl);

  DefaultConnectedControl.select = DefaultConnectedControlSelect;

  var DefaultConnectedControlButton = function (_DefaultConnectedCont9) {
    _inherits(DefaultConnectedControlButton, _DefaultConnectedCont9);

    function DefaultConnectedControlButton() {
      _classCallCheck(this, DefaultConnectedControlButton);

      return _possibleConstructorReturn(this, (DefaultConnectedControlButton.__proto__ || Object.getPrototypeOf(DefaultConnectedControlButton)).apply(this, arguments));
    }

    _createClass(DefaultConnectedControlButton, [{
      key: 'render',
      value: function render() {
        return _react2.default.createElement(ConnectedControl, _extends({
          component: 'button'
        }, this.props, {
          mapProps: _extends({}, _controlPropsMap2.default.button, this.props.mapProps)
        }));
      }
    }]);

    return DefaultConnectedControlButton;
  }(DefaultConnectedControl);

  DefaultConnectedControl.button = DefaultConnectedControlButton;

  var DefaultConnectedControlReset = function (_DefaultConnectedCont10) {
    _inherits(DefaultConnectedControlReset, _DefaultConnectedCont10);

    function DefaultConnectedControlReset() {
      _classCallCheck(this, DefaultConnectedControlReset);

      return _possibleConstructorReturn(this, (DefaultConnectedControlReset.__proto__ || Object.getPrototypeOf(DefaultConnectedControlReset)).apply(this, arguments));
    }

    _createClass(DefaultConnectedControlReset, [{
      key: 'render',
      value: function render() {
        return _react2.default.createElement(ConnectedControl, _extends({
          component: 'button',
          type: 'reset'
        }, this.props, {
          mapProps: _extends({}, _controlPropsMap2.default.reset, this.props.mapProps)
        }));
      }
    }]);

    return DefaultConnectedControlReset;
  }(DefaultConnectedControl);

  DefaultConnectedControl.reset = DefaultConnectedControlReset;

  return DefaultConnectedControl;
}

exports.createControlClass = createControlClass;
exports.default = createControlClass;