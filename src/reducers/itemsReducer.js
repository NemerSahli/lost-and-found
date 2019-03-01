const intialState = {
  items: null,
  myItems: null,
  categoryList: [
    { value: 'key', label: 'Keys', color: 'btn-indigo' },
    { value: 'wallet', label: 'Wallets', color: 'btn-danger' },
    { value: 'electronic', label: 'Electronics', color: 'btn-yellow' },
    { value: 'bicycle', label: 'Bicycles', color: 'btn-default' },
    { value: 'bag', label: 'Bags', color: 'btn-orange' },
    { value: 'document', label: 'Documents', color: 'btn-info' },
    { value: 'book', label: 'Books', color: 'btn-success' },
    { value: 'pet', label: 'Pets', color: 'btn-primary' },
    { value: 'jewellery', label: 'Jewellery', color: 'btn-yellow' },
    { value: 'toy', label: 'Toys', color: 'btn-indigo' },
    { value: 'ticket', label: 'Tickets', color: 'btn-danger' },
    { value: 'other', label: 'Others', color: 'btn-default' }
  ],
  imgDataUri: null,
  markers: null,
  center: [52.5, 13.4]
};
var averageLat = 0;
var averageLng = 0;
var markers=[];

export default function(state = intialState, action) {
  switch (action.type) {
    case 'LOAD_ITEMS':
      return {
        ...state,
        items: action.payload
      };
    case 'LOAD_My_ITEMS':
      return {
        ...state,
        myItems: action.payload
      };

    case 'GENERATE_MARKERS':
      averageLat = 0;
      averageLng = 0;
      if (state.items) {
         markers = state.items.map(item => {
          let lnglat = item.lnglat.split(',');
          var color = '';
          item.type === 'lost' ? (color = 'red') : (color = 'green');
          averageLat += Number(lnglat[0]);
          averageLng += Number(lnglat[1]);

          return {
            key: item._id,
            id: item._id,
            position: [Number(lnglat[0]), Number(lnglat[1])],
            children: item.name,
            color: color,
            itemType: item.type,
            imageUrl: item.imageUrl
          };
        });

        return {
          ...state,
          markers: markers,
          center: [averageLat / markers.length, averageLng / markers.length]
        };
      } else {
        return {
          ...state
        };
      }

    case 'LOAD_IMAGE':
      return {
        ...state,
        imgDataUri: action.payload
      };
    case 'SEARCH_FOR_ITEMS':
      if (!action.payload) {
        return {
          ...state,
          items: null,

          searchNoResult:
            'Your search result: 0, Please try with other keywords ...'
        };
      }
      averageLat = 0;
      averageLng = 0;
      markers = action.payload.map(item => {
        let lnglat = item.lnglat.split(',');
        var color = '';
        item.type === 'lost' ? (color = 'red') : (color = 'green');
        averageLat += Number(lnglat[0]);
        averageLng += Number(lnglat[1]);

        return {
          key: item._id,
          id: item._id,
          position: [Number(lnglat[0]), Number(lnglat[1])],
          children: item.name,
          color: color,
          itemType: item.type,
          imageUrl: item.imageUrl
        };
      });

      return {
        ...state,
        items: action.payload.reverse(),
        markers: markers,
        center: [averageLat / markers.length, averageLng / markers.length]
      };

    case 'FILTER_ITEMS':
      var filteredItems = state.items.filter(
        item => item.category === action.payload
      );

      return {
        ...state,
        items: filteredItems
      };

    default:
      return state;
  }
}
