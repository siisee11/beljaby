import pandas as pd
import os
import threading
import time

def check_log(directory):
    files=pd.read_csv('files.csv')
    list_of_files=os.listdir(directory)
    #print(files.files)
    #print(list_of_files)
    #print(set(files.files))
    print('waiting...')
    if set(list_of_files) - set(files.files) != set():
        #print(set(list_of_files) - set(files.files))
        new_dir = set(list_of_files) - set(files.files)
        print(new_dir)
        for dr in new_dir:
            log = directory+dr+'/'+dr+'_r3dlog.txt'
            #print(log)
            f = open(log, 'r', encoding='UTF8')
            match_id = 0
            player_list = []
            while True:
                line = f.readline()
                if not line: break
                if match_id == 0 and 'GameID=' in line:
                    match_id = line.split('GameID=')[1].split('"')[0]
                if 'TeamOrder' in line:
                    player_list.append(line.split('TeamOrder')[1][4:].split('  - Champion')[0].split(' **LOCAL** - Champion')[0])
                if 'TeamChaos' in line:
                    player_list.append(line.split('TeamChaos')[1][4:].split('  - Champion')[0].split(' **LOCAL** - Champion')[0])
            print(match_id)
            print(player_list)
            f.close()

            #do what you want
            #save your excel with the name sample.xslx
            #append your excel into list of files and get the set so you will not have the sample.xlsx twice if run again
            #list_of_files.append(dr)
            #list_of_files=list(list_of_files)
            #save again the curent list of files 
            pd.DataFrame({'files':list_of_files}).to_csv('files.csv')

    threading.Timer(5, check_log,[directory]).start()
if __name__ == "__main__":
    directory = 'E:\Riot Games\League of Legends\Logs\GameLogs\\'
    check_log(directory)
