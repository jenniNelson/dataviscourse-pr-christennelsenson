import csv
from urllib.request import (
    urlopen, urlparse, urlunparse, urlretrieve
)
import re
from bs4 import BeautifulSoup as bs

class Pokemon:
    def __init__(self, input_data: list):
        self.name = input_data[30]
        self.attackk = input_data[19]
        self.defense = input_data[25]
        self.sp_attack = input_data[33]
        self.sp_defense = input_data[34]
        self.speed = input_data[35]
        self.type1 = input_data[36]
        self.type2 = input_data[37]
        self.id = int(input_data[32])
        self.long_id = "{:03d}".format(self.id)
        self.gen = input_data[39]


def find_evo_chain(index):
    global evo_involved
    src = bs(urlopen("https://www.serebii.net/pokedex-sm/{}.shtml".format(pokedex[index].long_id)),
             features="html.parser")
    table = src.find_all('table', attrs={'class': 'evochain'})[0]
    table_string = str(table)
    matches = re.findall(r'pokemon/\d{3}\.png', table_string)
    evo_involved = list(map(lambda s: s[-7:-4], matches))  # matches.map( lambda s : s[-7:-4] )
    return evo_involved


if __name__ == '__main__':
    print("\n--------    Reading Pokemon File...    --------\n")
    pokedex = list()
    with open('../data/pokemon_data/pokemon.csv', 'r', encoding='utf-8', newline='') as data:
        text = data.readline().strip().split(',')
        categoryToIndex = dict()
        for i in range(len(text)):
            categoryToIndex[text[i]] = i
        reader = csv.reader(data)
        for row in reader:
            mon = Pokemon(row)
            print(mon.id, mon.name)
            pokedex.append(mon)

    print("\n--------    Scraping Evolution Data...    --------\n")
    ev_info = list()
    for i in range(20,30):  #range(len(pokedex)):
        chain = find_evo_chain(i)
        long_index = pokedex[i].long_id
        chain_pos = chain.index(long_index)
        ev_from = ""
        ev_to = ""
        is_base = 0
        is_full_ev = 0
        if chain_pos > 0:
            ev_from = chain[chain_pos - 1]
        if chain_pos < len(chain) - 1:
            ev_to = chain[chain_pos + 1]
        if not ev_from:
            is_base = 1
        if not ev_to:
            is_full_ev = 1

        print(pokedex[i].name, long_index, ev_from, ev_to, is_base, is_full_ev, chain)
        ev_info.append([pokedex[i].name, long_index, ev_from, ev_to, is_base, is_full_ev, str(chain)])

    print("\n--------    Writing Evolution File...    --------\n")
    with open("../data/evolutions.csv", 'w', newline='', encoding='utf-8') as evo_file:
        writer = csv.writer(evo_file)
        writer.writerow(["name", "long_index", "ev_from", "ev_to", "is_base", "is_full_ev", "evo_family"])
        writer.writerows(ev_info)








