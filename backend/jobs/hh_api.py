import requests


def fetch_jobs(keyword, location, salary_from, salary_to):
    url = 'https://api.hh.ru/vacancies'
    params = {
        'text': keyword,
        'area': location,
        'salary_from': salary_from,
        'salary_to': salary_to,
    }
    try:
        response = requests.get(url, params=params)
        response.raise_for_status()
        return response.json()
    except requests.RequestException as e:
        print(f"Error fetching jobs: {e}")
        return {"error": str(e)}


def fetch_regions():
    url = 'https://api.hh.ru/areas'
    response = requests.get(url)
    if response.status_code == 200:
        areas = response.json()
        regions = {}
        for country in areas:
            regions[country['name'].lower()] = country['id']
            for region in country['areas']:
                regions[region['name'].lower()] = region['id']
                for subregion in region['areas']:
                    regions[subregion['name'].lower()] = subregion['id']
        return regions
    else:
        print(f"Ошибка при запросе регионов: {response.status_code}")
        return {}
