import wget

if __name__ == '__main__':


    # image_url = 'https://www.serebii.net/sunmoon/pokemon/289.png'
    # # Invoke wget download method to download specified url image.
    # local_image_filename = wget.download(image_url, out="../data/pokemon_data/sprites")
    #
    #
    # print(local_image_filename)


    for dex in range(1, 810):
        image_url = f'https://www.serebii.net/sunmoon/pokemon/{dex:03d}.png'
        print(image_url)
        local_image_filename = wget.download(image_url, out="../data/pokemon_data/sprites")
        print(local_image_filename)