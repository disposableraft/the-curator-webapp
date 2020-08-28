import argparse
import json
from gensim.models.word2vec import Word2Vec 

def main(name):
  model = Word2Vec.load("./word2vec.pickle")
  similars = model.wv.most_similar(name)

  tokens = [token for (token, score) in similars]

  result = {
    "name": name,
    "artists": tokens
  }
  return json.dumps(result)


if __name__ == '__main__':
  parser = argparse.ArgumentParser(description="Get similar artists from the word2vec model.")
  parser.add_argument("name", nargs=1)
  name = parser.parse_args().name[0]
  print(main(name))