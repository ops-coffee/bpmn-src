import { assign } from "min-dash";

export default function PaletteProvider(
  palette,
  create,
  elementFactory,
  handTool,
  lassoTool,
  spaceTool,
  globalConnect,
  translate
) {
  this.create = create;
  this.elementFactory = elementFactory;
  this.handTool = handTool;
  this.lassoTool = lassoTool;
  this.spaceTool = spaceTool;
  this.globalConnect = globalConnect;
  this.translate = translate;

  palette.registerProvider(this);
}

PaletteProvider.$inject = [
  "palette",
  "create",
  "elementFactory",
  "handTool",
  "lassoTool",
  "spaceTool",
  "globalConnect",
  "translate"
];

PaletteProvider.prototype.getPaletteEntries = function (element) {
  const {
    create,
    elementFactory,
    handTool,
    lassoTool,
    spaceTool,
    globalConnect,
    translate
  } = this;

  function createAction(type, group, className, title, options) {
    function createListener(event) {
      var shape = elementFactory.createShape(assign({ type: type }, options));

      if (options) {
        shape.businessObject.di.isExpanded = options.isExpanded;
      }

      create.start(event, shape);
    }

    var shortType = type.replace(/^bpmn:/, "");

    return {
      group: group,
      className: className,
      title: title || translate("Create {type}", { type: shortType }),
      action: {
        dragstart: createListener,
        click: createListener
      }
    };
  }

  return {
    "hand-tool": {
      group: "tools",
      className: "bpmn-icon-hand-tool",
      title: "Activate the hand tool",
      action: {
        click: function (event) {
          handTool.activateHand(event);
        }
      }
    },
    "lasso-tool": {
      group: "tools",
      className: "bpmn-icon-lasso-tool",
      title: "Activate the lasso tool",
      action: {
        click: function (event) {
          lassoTool.activateSelection(event);
        }
      }
    },
    "space-tool": {
      group: "tools",
      className: "bpmn-icon-space-tool",
      title: "Activate the create/remove space tool",
      action: {
        click: function (event) {
          spaceTool.activateSelection(event);
        }
      }
    },
    "global-connect-tool": {
      group: "tools",
      className: "bpmn-icon-connection-multi",
      title: "Activate the global connect tool",
      action: {
        click: function (event) {
          globalConnect.toggle(event);
        }
      }
    },
    "tool-separator": {
      group: "tools",
      separator: true
    },

    "create.start-event": createAction(
      "bpmn:StartEvent",
      "event",
      "bpmn-icon-start-event-none",
      "??????????????????"
    ),
    "create.end-event": createAction(
      "bpmn:EndEvent",
      "event",
      "bpmn-icon-end-event-none",
      "??????????????????"
    ),
    "create.timer-intermediate-event": createAction(
      "bpmn:IntermediateThrowEvent",
      "event",
      "bpmn-icon-intermediate-event-catch-timer",
      "??????????????????",
      { eventDefinitionType: "bpmn:TimerEventDefinition" }
    ),
    "create.intermediate-catch-event": createAction(
      "bpmn:IntermediateThrowEvent",
      "event",
      "bpmn-icon-intermediate-event-none",
      "Create Intermediate/Boundary Event"
    ),
    "create.user-task": createAction(
      "bpmn:UserTask",
      "activity",
      "bpmn-icon-user-task",
      "??????????????????"
    ),
    "create.servicetask": createAction(
      "bpmn:ServiceTask",
      "activity",
      "bpmn-icon-service-task",
      "??????????????????"
    ),
    "create.scripttask": createAction(
      "bpmn:ScriptTask",
      "activity",
      "bpmn-icon-script-task",
      "??????????????????"
    ),
    "create.exclusive-gateway": createAction(
      "bpmn:ExclusiveGateway",
      "gateway",
      "bpmn-icon-gateway-xor",
      "??????????????????"
    ),
    "create.parallel-gateway": createAction(
      "bpmn:ParallelGateway",
      "gateway",
      "bpmn-icon-gateway-parallel",
      "??????????????????"
    ),
    "create.participant": createAction(
      "bpmn:Participant",
      "collaboration",
      "bpmn-icon-participant",
      "????????????/??????"
    ),
    "create.group": createAction(
      "bpmn:Group",
      "collaboration",
      "bpmn-icon-group",
      "?????? Group"
    )
  };
};
