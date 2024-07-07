from django.http import JsonResponse
from .hh_api import fetch_jobs, fetch_regions


def search_jobs(request):
    regions = fetch_regions()
    keyword = request.GET.get('keyword', '')
    location = regions.get(request.GET.get('location', '').lower(), 1)
    salary_from = request.GET.get('salary_from', 0)
    salary_to = request.GET.get('salary_to', 0)
    try:
        salary_from = int(salary_from) if salary_from else 0
        salary_to = int(salary_to) if salary_to else 0

        print(f"Fetching jobs with keyword={keyword}, location={location}, salary_from={salary_from}, salary_to={salary_to}")
        jobs_data = fetch_jobs(keyword, location, salary_from, salary_to)
        if jobs_data.get('error'):
            print(f"Error from fetch_jobs: {jobs_data['error']}")
            return JsonResponse({'error': jobs_data['error']}, status=500)

        if 'items' in jobs_data:
            jobs = [
                {
                    'title': item['name'],
                    "company": 'N/A' if item.get("employer") is None else item.get("employer").get("name"),
                    'salary_from': 'N/A' if item.get("salary") is None else item.get('salary').get('from', 'N/A'),
                    'salary_to': 'N/A' if item.get("salary") is None else item.get('salary', dict()).get('to', 'N/A'),
                    'location': 'N/A' if item.get("area") is None else item.get('area', dict()).get('name', 'N/A'),
                    'url': item.get('alternate_url', '#')
                }
                for item in jobs_data['items']
            ]
        else:
            print("No jobs found or unexpected response from API.")
            return JsonResponse({'error': 'No jobs found or API returned an unexpected response.'}, status=404)

    except Exception as e:
        print(f"Exception in search_jobs: {e}")
        return JsonResponse({'error': str(e)}, status=500)

    return JsonResponse({'jobs': jobs})
