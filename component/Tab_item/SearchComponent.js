import React, { useState } from 'react';
import { View, FlatList } from 'react-native';
import { Searchbar } from 'react-native-paper';

const SearchComponent = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  // Hàm này sẽ được gọi khi nội dung của Searchbar thay đổi
  const handleSearch = (text) => {
    setSearchQuery(text);

    // Thực hiện tìm kiếm dựa trên nội dung `text` và cập nhật `searchResults`
    // Ví dụ: bạn có thể gọi một API hoặc tìm kiếm trong dữ liệu của mình ở đây
    // Sau đó, cập nhật `searchResults` với kết quả tìm kiếm
  };

  return (
    <View>
      <Searchbar
        placeholder="Tìm kiếm..."
        value={searchQuery}
        onChangeText={handleSearch}
      />

      <FlatList
        data={searchResults}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View>
            {/* Hiển thị kết quả tìm kiếm ở đây */}
          </View>
        )}
      />
    </View>
  );
};

export default SearchComponent;