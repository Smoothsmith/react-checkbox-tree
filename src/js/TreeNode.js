import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

import NativeCheckbox from './NativeCheckbox';
import nodeShape from './nodeShape';

class TreeNode extends React.Component {
  static propTypes = {
      checked: PropTypes.number.isRequired,
      disabled: PropTypes.bool.isRequired,
      expandDisabled: PropTypes.bool.isRequired,
      expanded: PropTypes.bool.isRequired,
      label: PropTypes.node.isRequired,
      optimisticToggle: PropTypes.bool.isRequired,
      showNodeIcon: PropTypes.bool.isRequired,
      treeId: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
      onCheck: PropTypes.func.isRequired,
      onExpand: PropTypes.func.isRequired,

      children: PropTypes.node,
      className: PropTypes.string,
      icon: PropTypes.node,
      rawChildren: PropTypes.arrayOf(nodeShape),
      showCheckbox: PropTypes.bool,
	  parent: PropTypes.object,
  };

  static defaultProps = {
      children: null,
      className: null,
      icon: null,
      rawChildren: null,
      showCheckbox: true,
  };

  constructor(props) {
      super(props);

      this.onCheck = this.onCheck.bind(this);
      this.onExpand = this.onExpand.bind(this);
  }

  onCheck() {
      let isChecked = false;

      // Toggle off state to checked
      if (this.props.checked === 0) {
          isChecked = true;
      }

      // Toggle partial state based on cascade model
      if (this.props.checked === 2) {
          isChecked = this.props.optimisticToggle;
      }

      this.props.onCheck({
          value: this.props.value,
          checked: isChecked,
          children: this.props.rawChildren,
          parent: this.props.parent,
      });
  }

  onExpand() {
      this.props.onExpand({
          value: this.props.value,
          expanded: !this.props.expanded,
      });
  }

  hasChildren() {
      return this.props.rawChildren !== null;
  }

  renderCollapseButton() {
      const { expandDisabled } = this.props;

      if (!this.hasChildren()) {
          return (
              <span className="rct-collapse">
                  <span className="rct-icon" />
              </span>
          );
      }

      return (
          <button
              aria-label="Toggle"
              className="rct-collapse rct-collapse-btn"
              disabled={expandDisabled}
              title="Toggle"
              type="button"
              onClick={this.onExpand}
          >
              {this.renderCollapseIcon()}
          </button>
      );
  }

  renderCollapseIcon() {
      if (!this.props.expanded) {
          return <i className="icon">chevron_right</i>;
      }
      return <i className="icon">expand_more</i>;
  }

  renderCheckboxIcon() {
      if (this.props.checked === 0) {
          return <i className="icon">check_box_outline_blank</i>;
      }

      if (this.props.checked === 1) {
          return <i className="icon rct-icon-blue">check_box</i>;
      }

      if (this.props.checked === 2) {
          return <i className="icon rct-icon-half">check_box</i>;
      }

      return <i className="icon rct-icon-green">check_box</i>;
  }

  renderNodeIcon() {
      if (this.props.icon !== null) {
          return this.props.icon;
      }

      if (!this.hasChildren()) {
          return <i className="icon">description</i>;
      }

      if (!this.props.expanded) {
          return <i className="icon">folder</i>;
      }
      return <i className="icon">folder_open</i>;
  }

  renderBareLabel(children) {
      return <span className="rct-bare-label">{children}</span>;
  }

  renderCheckboxLabel(children) {
      const {
          checked, disabled, label, treeId, value,
      } = this.props;

      const inputId = `${treeId}-${value.split(' ').join('_')}`;

      return (
          <label htmlFor={inputId}>
              <NativeCheckbox
                  checked={checked === 1}
                  disabled={disabled}
                  id={inputId}
                  indeterminate={checked === 2}
                  onChange={this.onCheck}
              />
              <span className="rct-checkbox">{this.renderCheckboxIcon()}</span>
              {children}
          </label>
      );
  }

  renderLabel() {
      const { label, showCheckbox, showNodeIcon } = this.props;

      const labelChildren = [
          showNodeIcon ? (
              <span key={0} className="rct-node-icon">
                  {this.renderNodeIcon()}
              </span>
          ) : null,
          <span key={1} className="rct-title">
              {label}
          </span>,
      ];

      if (!showCheckbox) {
          return this.renderBareLabel(labelChildren);
      }

      return this.renderCheckboxLabel(labelChildren);
  }

  renderChildren() {
      if (!this.props.expanded) {
          return null;
      }

      return this.props.children;
  }

  render() {
      const { className, disabled } = this.props;
      const nodeClass = classNames(
          {
              'rct-node': true,
              'rct-node-parent': this.hasChildren(),
              'rct-node-leaf': !this.hasChildren(),
              'rct-disabled': disabled,
          },
          className,
      );

      return (
          <li className={nodeClass}>
              <span className="rct-text">
                  {this.renderCollapseButton()}
                  {this.renderLabel()}
              </span>
              {this.renderChildren()}
          </li>
      );
  }
}

export default TreeNode;
