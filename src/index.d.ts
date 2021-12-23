import * as React from 'react';

declare module "react-checkbox-tree" {
    interface Node {
        label: React.ReactNode;
        value: string;
        children?: Array<Node>;
        className?: string;
        disabled?: boolean;
        icon?: React.ReactNode;
        showCheckbox?: boolean;
        title?: string;
    }

    interface Icons {
        check?: React.ReactNode;
        uncheck?: React.ReactNode;
        halfCheck?: React.ReactNode;
        orphanCheck?: React.ReactNode;
        expandOpen?: React.ReactNode;
        expandClose?: React.ReactNode;
        expandAll?: React.ReactNode;
        collapseAll?: React.ReactNode;
        parentClose?: React.ReactNode;
        parentOpen?: React.ReactNode;
        leaf?: React.ReactNode;
    }

    interface Language {
        collapseAll: string;
        expandAll: string;
        toggle: string;
    }

    interface CheckboxProps<NodeType extends Node = Node> {
        nodes: Array<NodeType>;

        checkModel?: string;
        checked?: Array<string>;
        direction?: string;
        disabled?: boolean;
        expandDisabled?: boolean;
        expandOnClick?: boolean;
        expanded?: Array<string>;
        icons?: Icons;
        iconsClass?: string;
        id?: string;
        lang?: Language;
        name?: string;
        nameAsArray?: boolean;
        nativeCheckboxes?: boolean;
        noCascade?: boolean;
        onlyLeafCheckboxes?: boolean;
        optimisticToggle?: boolean;
        showExpandAll?: boolean;
        showNodeIcon?: boolean;
        showNodeTitles?: boolean;
        onCheck?: (checked: Array<string>, node: NodeType & {checked: boolean}) => void;
        onClick?: (node: NodeType & {checked: boolean}) => void;
        onExpand?: (expanded: Array<string>, node: NodeType & {expanded: boolean}) => void;
    }

    export default class CheckboxTree extends React.Component<CheckboxProps> {}
}
