import requests
import json

class BsdFacetRetriever:
    def __init__(self, environment, query):
        self.environment = environment
        self.base_uri = environment
        self.query = query
        self.facets = self.get_facets_from_samples()
        
    @property
    def base_uri(self):
        return self._base_uri
    
    @base_uri.setter
    def base_uri(self, value):
        match value:
            case "dev":
                prefix = "wwwdev"
            case "test" | "int":
                prefix = "wwwint"
            case _:
                prefix = "www"
        self._base_uri = f"https://{prefix}.ebi.ac.uk/biosamples/samples"
        
    def _get_all_samples(self):
        page = requests.get(f"{self.base_uri}?{self.query}&size=100").json()
        samples = page['_embedded']['samples']
        i = 100
        print(i)
        while page.get('_links').get('next'):
            page = requests.get(page['_links']['next']['href']).json()
            samples.extend(page.get('_embedded', {}).get('samples', []))
            i += 100
            print(i)
        return samples
        
    def get_facets_from_samples(self):
        samples = self._get_all_samples()
        facet_map = {}
        for sample in samples:
            for characteristic_name, value in sample['characteristics'].items():
                if characteristic_name not in facet_map:
                    facet_map[characteristic_name] = {}
                    facet_map[characteristic_name]['content'] = []
                to_append = ""
                if value[0].get('unit'):
                    to_append = f" ({value[0]['unit']})"
                facet_map[characteristic_name]['content'].append({'label': f"{value[0]['text']}{to_append}"})
                facet_map[characteristic_name]['id'] = characteristic_name
                facet_map[characteristic_name]['label'] = characteristic_name
                facet_map[characteristic_name]['type'] = 'attribute'
        facets = []
        for key, value in facet_map.items():
            content = value['content']
            unique_content = list(dict(sorted((v['label'], v) for v in content)).values())
            value['content'] = unique_content
            facets.append(value)
        return facets

    def to_file(self, file_path = None):
        if not file_path:
            file_path = 'facets.json'
        print(self.facets)
        with open(file_path, 'w') as f:
            json.dump(self.facets, f, indent=4)
            
            
if __name__ == '__main__':
    for organism in ['soil metagenome', 'seed metagenome', 'marine metagenome']:
        facet_retriever = BsdFacetRetriever("prod", f"filter=attr:project+name:MICROBE&filter=attr:organism:{organism}")
        facet_retriever.to_file(f"{organism.split()[0]}_facets.json")