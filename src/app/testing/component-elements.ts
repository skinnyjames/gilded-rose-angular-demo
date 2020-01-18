export class ComponentElements {

  static fixture: any;

  constructor(fixture) {
      ComponentElements.fixture = fixture;
  }

  static elements(selector) {
      return {
          elements() {
              const nodeList = ComponentElements.fixture.nativeElement.querySelectorAll(selector);
              if (!nodeList) {
                  return null;
              }
              const nodeArray = [];
              for (const node of nodeList) {
                  nodeArray.push(ComponentElements.element(node));
              }
              return nodeArray;
          }
      };
  }

  static element(selector) {
      return {
          element() {
              if (typeof selector === 'string') {
                  return ComponentElements.fixture.nativeElement.querySelector(selector);
              } else {
                  return selector;
              }
          },
          locate(childSelector) {
              const parent = this.element;
              return {
                  ...this,
                  element() {
                      return parent().querySelector(childSelector);
                  }
              };
          },
          locateAll(childSelector) {
              const parent = this.element;
              return {
                  elements() {
                      const nodeList = parent().querySelectorAll(childSelector);
                      if (!nodeList) {
                          return null;
                      }
                      const nodeArray = [];
                      for (const node of nodeList) {
                          nodeArray.push(ComponentElements.element(node));
                      }
                      return nodeArray;
                  }
              };
          },
          click(detectChanges: boolean = true) {
              this.element().click();
              this.input();
              this.change();
              this.blur();
              if (detectChanges) {
                  ComponentElements.fixture.detectChanges();
              }
          },
          change() {
              this.dispatch('change');
          },
          blur() {
              this.dispatch('blur');
          },
          input() {
              this.dispatch('input');
          },
          dispatch(eventName) {
              this.element().dispatchEvent(new Event(eventName));
          }
      };
  }

  static textField(selector) {
      return {
          ...ComponentElements.element(selector),
          set(value) {
              this.element().value = value;
              this.input();
              this.change();
              this.blur();
          },
          get() {
              return this.element().value;
          }
      };
  }

  static button(selector) {
      return ComponentElements.element(selector);
  }

  static selectList(selector) {
      return {
          ...ComponentElements.element(selector),
          set(value) {
              this.element().value = value;
              this.input();
              this.change();
              this.blur();
          },
          get() {
              return this.element().value;
          }
      };
  }

  static checkbox(selector) {
      return {
          ...ComponentElements.element(selector),
          set(value) {
              if (value === true && !this.element().checked) {
                  this.click();
              } else if (value === false && this.element().checked) {
                  this.click();
              }
              this.change();
              this.blur();
          },
          get() {
              return this.element().checked;
          }
      };
  }

  static radio(selector) {
      return {
          ...ComponentElements.element(selector),
          set(value) {
              if (value === true) {
                  this.element().click();
                  this.change();
                  this.blur();
              }
          }
      };
  }

  populatePageWith(options) {
      for (const key in options) {
          if (this[key].set) {
              this[key].set(options[key]);
          }
      }
  }
}