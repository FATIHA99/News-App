import { StyleSheet, Text, View, TouchableOpacity, FlatList } from 'react-native'
import React, { useState } from 'react'
import { Appbar, Chip, Button, useTheme } from 'react-native-paper'
import { NewsData } from '../utils/types'
import CardItem from '../components/CardItem'

const categories = ['world', 'Sports', 'politics', 'science', 'top']
const API_KEY = "pub_18230e01526547fa35e41b4b98c15e0e213fe "
const Home = () => {
  const [selectedCategories, setSelectedCategories] = useState([])
  const theme = useTheme();
  const [newsData, setNewsData] = useState<NewsData[]>([]);
  const [nextPage, setNextPage] = useState("")

  const handleSelect = (val: string) => {
    setSelectedCategories((prev: string[]) =>
      prev.find((p) => p === val)
        ? prev.filter((cat) => cat !== val)
        : [...prev, val]
    )

  }
  const handlePress = async () => {
    const URL = `https://newsdata.io/api/1/news?apikey=${API_KEY}&country=ru&language=en${selectedCategories.length > 0
        ? `&category=${selectedCategories.join()}`
        : ""
      }${nextPage?.length > 0 ? `&page=${nextPage}` : ""}`;
    //  console.log(URL)
    // const URLL ='https://newsdata.io/api/1/news?apikey=pub_18230e01526547fa35e41b4b98c15e0e213fe&country=ru&language=en&category=politics,science,top,world'

    try {
      await fetch(URL)
        .then((res) => res.json())
        .then((data) => {
          setNewsData((prev)=>[...prev , ...data.results])
          setNextPage(data.nextPage)
        })
    } catch (err) {
      console.log(err)
    }
    // newsData[0]?
    //  console.log(Object.keys(newsData[0])): console.log('canot display ')
  };


  return (
    <View style={styles.container}>
      <Appbar.Header>
        <Appbar.Content title="Home" />
      </Appbar.Header>
      <View style={styles.filtersContainer}>
        {categories.map((cat) => (
          <Chip
            key={cat}
            mode="outlined"
            style={styles.chipItem}
            textStyle={{ fontWeight: "400", color: 'white', padding: 1 }}
            showSelectedOverlay
            selected={selectedCategories.find((c) => cat === c) ? true : false}
            onPress={() => handleSelect(cat)}
          >

            {cat}
          </Chip>))}
        <Button
          mode='elevated'
          style={styles.button}
          labelStyle={{
            fontSize: 14,
            margin: 'auto',
            color: theme.colors.primary
          }}
          icon={"sync"}
          onPress={handlePress}
        >
          Refresh
        </Button>

      </View>

      <FlatList onEndReached={()=>handlePress()}
       style={styles.flatList}
        data={newsData} renderItem={({ item }) => <CardItem
          category={item.category}
          content={item.content}
          country={item.country}
          creator={item.creator}
          description={item.description}
          image_url={item.image_url}
          keywords={item.keywords}
          language={item.language}
          link={item.link}
          pubDate={item.pubDate}
          source_id={item.source_id}
          title={item.title}
          video_url={item.video_url}
        />} />
    </View>
  )
}

export default Home

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  filtersContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginVertical: 10,
  },
  chipItem: {
    marginHorizontal: 5,
    marginVertical: 5
  },
  button: {
    maxWidth: 400,
    padding: 0,
    maxHeight: 40,
  },
  flatList: {
    flex: 1,
    height: "auto"
  }



})