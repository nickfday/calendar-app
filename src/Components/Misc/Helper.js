import React from "react";

export function splitMap(string, separator, className) {
  if (string) {
    let list = string.split(separator).map((i, key) => {
      //warning  'list' is already defined  no-redeclare
      return (
        <div className={className} key={key}>
          {i}
        </div>
      );
    });
    return (
      <div>
        {list}
      </div>
    );
  }
}

export function searchFilter(searchVal, itemVal) {
  if (
    searchVal !== "" &&
    itemVal.toLowerCase().indexOf(searchVal.toLowerCase()) === -1
  ) {
    return false;
  }
  return true;
}

// //Select Event Type
//       eventMatch = this.filterMultiSelect(
//         self.props.events.selectedEventTypes,
//         eventItem.event_type,
//         eventItem,
//         this.eventMatch,
//         matchedTag
//       );

export function filterMultiSelect(selectedTag, itemTag) {
  var matchedTag = [];
  var uniqueMatched = 0;
  var match = true;

  console.log(selectedTag);
  console.log(itemTag);

  Object.keys(selectedTag).map(selectedTagI => {
    console.log(selectedTag);
    //loop all sorted tags
    if (itemTag) {
      itemTag.split(", ").sort().map(itemTagI => {
        //if selected audience value == tag push onto matched event
        console.log(itemTagI);
        if (selectedTag[selectedTagI].value === itemTagI) {
          matchedTag.push(itemTag);
          return false;
        } else {
          return false;
        }
      });
    }
  });

  if (matchedTag.length !== selectedTag.length) {
    return false;
  } else {
    return true;
  }
}
