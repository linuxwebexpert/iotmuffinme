# Node.JS + Vega-lite + Elasticsearch = a tasty mix

_**#Vega (Vega-lite) | #SPC (Statistical Process Control) | #Node (Node.JS/Faker)**_

Welcome to the IoT Baking Company fictitious coding challenge, where you will be
given a basic Node.JS application, and a Vega-lite JSON file for generating both
the data stream and the basic graphs using Vega and Elasticsearch.

The challenge is to create better graphs, more meaningful data visualizations,
implement correlations between data anomalies and trends, improve the overall
visual impact of the graph, and create Elastic alarms for monitoring conditions.

The premise of our IoT requirements are to control the processes by which the company
muffins are baked daily, by watching IoT sensors, dashboards, and getting alarm alerts
in the event of an "excursion" in the baking assembly line.

We will be sending sensor data from pins embedded in the muffin trays directly to
Elasticsearch as the muffin trays travel through the baking process. If at any
point in the production of the world's most tasty muffins with the secret ingredients
and baking recipe vary so much as one degree from perfection, the muffin is given to
the food banks as a charity write off for taxes.

## Requirements and Installation

- Node.JS (_tested with version 14.x_)
- Elasticsearch (_tested with Elastic Cloud Service 7.x_)
- npm packages (_tested with version 6.x_)
- CLI shell (_tested with Bash 5.x_)

1. Clone the repository `git clone https://github.com/linuxwebexpert/iotmuffinme.git`
2. Edit your `.env` file and change the `ELASTIC_ENDPOINT` & `ELASTIC_CREDENTIALS` as needed
3. Using a shell window change to the working directory and install the dependencies `npm install`
4. Try running the application to see if data is being generated in developer mode `npm run dev`
5. Now goto your Elasticsearch installation and create an index for `muffin-1*`
6. Using **Kibana -> Visualize** insert the `vega-lite-spc.json` file code into the editor
