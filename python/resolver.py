import argparse
import json
from gensim.models.word2vec import Word2Vec 

def name_to_token(name):
  with open("lib/names_to_tokens.json", 'r') as f:
    mapping = json.loads(f.read())
  return mapping[name]

def tokens_to_names(tokens):
  with open("lib/tokens_to_names.json", 'r') as f:
    mapping = json.loads(f.read())
  return [mapping[t] for t in tokens]

def main(name):
  token = name_to_token(name)
  model = Word2Vec.load("python/word2vec.pickle")
  similars = model.wv.most_similar(token)
  similar_tokens = [token for (token, score) in similars]
  
  names = [name for name in tokens_to_names(similar_tokens)]

  result = {
    "name": name,
    "artists": names
  }
  return json.dumps(result)


if __name__ == '__main__':
  parser = argparse.ArgumentParser(description="Get similar artists from the word2vec model.")
  parser.add_argument("name", nargs=1)
  name = parser.parse_args().name[0]
  print(main(name))