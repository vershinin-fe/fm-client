import React, {Component} from "react";
import ToggleableItemForm from "./ToggleableItemForm";
import EditableItemsList from "./EditableItemsList";
import SortMenu from "./SortMenu";

export default class ItemsListView extends Component {
    render() {
        return (
            <div className="ui container">
                <ToggleableItemForm/>
                <div className="ui segments">
                    <SortMenu/>
                    <EditableItemsList/>
                </div>
            </div>
        );
    }
}