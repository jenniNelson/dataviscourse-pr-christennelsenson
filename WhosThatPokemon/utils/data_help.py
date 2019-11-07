import csv
from selenium import webdriver
from bs4 import BeautifulSoup

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


if __name__ == '__main__':
    pokedex = list()
    with open('../data/pokemon_data/pokemon.csv', 'r', encoding='utf-8', newline='') as data:
        text = data.readline().strip().split(',')
        categoryToIndex = dict()
        for i in range(len(text)):
            categoryToIndex[text[i]] = i
            print(text[i], i)
        reader = csv.reader(data)
        for row in reader:
            print("{:16s}{:03d}{:>10s}".format(row[30], int(row[32]), row[20]))
        # print("------base_totals------")
        # for line in data:
        #     raw_point = line.strip().split(',')
        #     print(raw_point[30], ",",  raw_point[22])





