import React from "react";
import moment from "moment";

export function splitMap(string, separator, className) {
  if (string) {
    let list = string.split(separator).map((i, key) => {
      //warning  'list' is already defined  no-redeclare
      return (
        <div className={className} key={key}>
          {i.charAt(0).toUpperCase() + i.slice(1).toLowerCase()}
        </div>
      );
    });
    return <div>{list}</div>;
  }
}

export function searchFilter(searchVal, itemVal) {
  if (itemVal == null && searchVal) {
    return false;
  }
  if (
    itemVal &&
    (searchVal !== "" &&
      itemVal.toLowerCase().indexOf(searchVal.toLowerCase()) === -1)
  ) {
    return false;
  }
  return true;
}

export function filterMultiSelect(selectedTag, itemTag) {
  let matchedTag = [];
  Object.keys(selectedTag).map(selectedTagI => {
    //loop all sorted tags
    if (itemTag) {
      itemTag
        //.split(', ')
        .sort()
        .map(itemTagI => {
          //if selected audience value == tag push onto matched event
          if (selectedTag[selectedTagI].value === itemTagI) {
            matchedTag.push(itemTag);
            return false;
          } else {
            return false;
          }
        });
    }
    return false;
  });

  if (matchedTag.length !== selectedTag.length) {
    return false;
  } else {
    return true;
  }
}

export function displayTimeDST(date) {
  if (moment().isDST()) {
    return moment(date)
      .add(1, "hours")
      .format("h:mma");
  } else {
    return moment(date)
      .add(1, "hours")
      .format("h:mma");
  }
}
