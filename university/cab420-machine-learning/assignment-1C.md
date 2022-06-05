---
toc_max_heading_level: 4
description: "Problem 1. Clustering and Recommendations. Problem 2. Multi-Task Learning"
---

# Assignment 1C

- Name: Baorong Huang
- Student Number: n10172912

## Problem 1. Clustering and Recommendations

Develop a method to cluster users based on their movie viewing preferences.

### Discussion of Clustering Method

<!-- Clear and concise discussion of the clustering method chosen, drawing on theoretical knowledge to justify the approach. Clear and well-reasoned discussion of any data manipulation. -->

#### Data to Cluster

<!-- Description and justification of the data that you chose to cluster; -->

**Description of the data**: I only use the data containing in `ratings.csv` and `movies.csv` files. Firstly, I compute the average rating of each movie using the `rating.csv` file because my goal is to cluster users rather than movies. Secondly, the `genres` column in `movies.csv` is split into multiple columns because this is easier to manipulate. Finally, I combined the `ratings.csv` and `movies.csv` tables, obtaining a combined table that contains average rating each user has reported for all genres.

The dataset contains 9742 movies and 100836 ratings.

<!-- You will have to decide how you treat genres that have an average rating of NaN -->

**Special treatments (Data manipulation)**:

- There are some average ratings that are `NaN`, which indicates that the user has not watched any movies from this genre. I replace the `NaN` with 0. Because `NaN` values suggest that the user does not like this genre and a 0 can be used to represent this dislike relation (they are not a fan of this genre).

- Remove the "(no genres listed)" column in the combined table. The average rating for movies that don't have genres listed cannot provide useful information when clustering users. Because a movie without genres listed cannot tell the cluster algorithm what movies the user prefers to watch or does not want to watch. For example, we would like to cluster users who like to watch "Musical-Children" rather than having a cluster of users who like "Musical-(no genres listed)" which does not make sense. Clustering users who like "(no genres listed)" is meaningless.

After these pre-processing, I plot the t-SNE graph for the dataset.

![t-SNE](_assets-1C/t-SNE-for-all.png)

From the t-SNE we can see that: there are some groups of users who have distinct preferences.

#### Justification for the Selected Clustering Method

The selected clustering method is **Gaussian Mixture Model**.

The reasons are:

1. As a recommendation system, we might want to make recommendations for new users. If we use HAC or DBScan, it is difficult to add new points to clusters after clustering. Because new points can change the clustering results. Therefore, the clustering methods left are K-Means and GMMs as they allow us to make recommendations for new users.
2. Eliminate K-Means.
   - K-Means can only extracts spherical clusters because each point in a cluster should be near to the center of that cluster. The spherical shape clusters cannot capture user groups effectively as the shape of the cluster will be much more complex.
   - The clusters cannot **overlap**. By observing the data we can see that there will be a certain amount of overlap between user groups. For example, cluster "Musical-Children" might overlap with cluster "Animation-Musical".
3. The advantages of a GMM over K-Means is that we can get **soft assignment** and the **likelihood of each point** for each cluster. With these two properties we can get a better idea of where the user lies, and how close it is to other cluster centers and make use of that to make recommendations. For instance, if a user lies between two clusters according to the likelihood (e.g., [0.21, 0.4, 0.37, 0.02]), we can recommend popular movies from these two clusters (e.g., the second and third cluster) rather than relying on only one cluster.
4. With GMM we are able to avoid **hard decisions** for as long as possible. Because we can obtain a soft assignment, and carry the uncertainty about which cluster a user belongs to and finally make recommendations based on this information.

#### Selection of Hyper-Parameters

GMMs need us to specify a number of clusters. Because I don't have prior knowledge of the data. I will use the **Bayesian Information Criterion** to determine the number of clusters. BIC is combination of model complexity and error.

By the way, in order to overcome the impact of random variation in the clustering. I ran each clustering step a few times with different random seeds and average the resulting BIC.

![BIC](_assets-1C/BIC.png)

Considering our task, which is to group users into viewing habits, larger numbers of clusters will mean more fine-grained segmentation and more data to analyze. This not necessarily a bad thing (especially for this big user collection where a diverse viewing habits is possible), however for easy visualizing and analyzing we will pick 3. Because the minimum curve is the best value of $K$. According to the **BIC** graph above, we can see that the best number of clusters is 3.

### Analysis of Clustering

<!-- Excellent and insightful analysis of clustering results. Analysis is supported and enhanced by appropriate metrics and/or figures.  -->

<!-- A brief discussion and analysis of the results of the clustering, including interpretation of the resultant clusters (i.e. are clusters distinct, do they capture  different viewer habits? -->

We can think of each cluster being a type of viewing habit. As such, we can look at how each cluster (viewing habit) differs from each other to analyzing the clustering results. To achieve this, I drew bar charts for each cluster.

![cluster centers](_assets-1C/cluster-centers.png)

Considering the average rating for "IMAX", "Film-Noir", "Animation", and "Documentary", we can see a huge variation. These plots suggest that we can use ratings of genre to cluster users. For example, if the a user who has never watched movies from "Film-Noir" we should not recommend movies from "Documentary" because this type of user is assigned to cluster 1 and the user is expected to give a very low rating for "Documentary" movies or even ignore the recommendation.

Instead of manually inspecting these plots, I will compute the histogram intersection. For two histograms that are identical, the intersection will be1. For two that are totally different, the intersection will be 0.

| Clusters               | Intersection |
| ---------------------- | ------------ |
| Cluster 1 vs Cluster 2 | 0.5          |
| Cluster 1 vs Cluster 3 | 0.666        |
| Cluster 2 vs Cluster 3 | 0.5          |

The intersection values for these 3 clusters are fairly small, which suggests that the algorithm captures different viewer habits effectively.

Because we have high dimensional data, which is difficult to plot, we will visualize the result using t-SNE.

![t-SNE for the GMM result](_assets-1C/t-SNE-for-clusters.png)

What we can see:

1. We have two types of viewing preferences that are significantly different from each other i.e., the yellow and purple clusters. This makes sense because we have clusters that have a intersection value of 0.5. And the difference is likely caused by the different preferences in "Film-Noir" and "Documentary" genre movies.
2. The yellow and green clusters are located relatively close. This two clusters might contain users who enjoy "Documentary" movies.

The t-SNE suggests that there are three different viewer habits in the dataset.

### Clustering Recommendations

<!-- 3-5 recommendations provided for each of the users. Clear and concise discussion that outlines and justifies how the recommendations were obtained and considers these recommendations in relation to the user’s previous viewing history -->

Below are the movies recommended for the three users with IDs: 4, 42, and 314;

| User | Cluster | Recommendations (movie id)  |
| ---- | :-----: | --------------------------- |
| 4    |    3    | [356, 318, 1210, 4993, 480] |
| 42   |    3    | [1198, 4993, 480, 2858, 1]  |
| 314  |    1    | [2571, 231, 4993, 292, 454] |

#### How to Obtain Recommendations

<!-- A brief description and justification for how recommendations were obtained; -->

Steps for obtaining recommendations for a user:

1. Cluster the data into different viewing habits.
2. Identify the cluster that the user belongs to.
3. Find the popular movies within the cluster. This is achieved by ordering the movie by the number of watches.
4. Find the movies that the user has already watched.
5. Find the set difference between the "Movies in the cluster" and "Movies watched by the user" to obtain a list of movies that the user have never seen.
6. Because the list has already been ordered by popularity, we can just slice the list to obtain the top-5 or top-3 movies to recommend.

**Note**: at the step 2 of the algorithm, because GMM give us the likelihoods of a user belongs to clusters. We can do further analysis on the likelihoods returned by the GMM (e.g., `gmm.predict_proba(user_4)`). For example. if the likelihoods of a user belongs to cluster 1 and cluster 2 are 37% and 42% respectively. We can then modify the algorithm a bit to obtain popular movies from these two clusters rather than obtaining movies from only one cluster.

#### Users Viewing History & Previous Ratings

![users previous average ratings](_assets-1C/users-avg-ratings-hist.png)

<!-- Q. For Q1, how can tell if my recommendations make sense?
A. One way would be to create some test subjects. Pick a few subjects at random, remove a bunch of the movies that they've seen, and then see if you're approach can recommend movies that they've enjoyed. Note that if you do this, I'd suggest that for your test subjects make sure you pick users who've watched lots of moves, and only remove a small number of films. This will help ensure that your changes to their viewing history don't change the cluster to which they are assigned. -->

In order to check if the recommendations make sense. I pick a few users at random, remove a bunch of the movies that they have seen. Then I find the **intersection** between the movies my system recommended and the movies removed. After that I calculate a metric called $Accuracy$ to evaluate the performance. And it is defined as follow:

$$
\begin{aligned}
A &= \text{Recommend Movies} \\
B &= \text{Removed Movies} \\
Accuracy &= \frac{|A \cap B|}{\text{|A|}}

\end{aligned}
$$

![recommendation accuracy](_assets-1C/recommendation-accuracy.png)

The graph above shows the $Accuracy$ values of the recommendations for 100 random users after removing 50 movies they already seen.

What we see is:

- The recommendation system did not do a good job for a few users. The accuracies of the recommendations are very low. For example, the accuracies for the users with the IDs 89, 567, and 564 are **0**. In order to further investigate on these low-accuracy users. I draw a bar chart below, we can see that these users' viewing habits are significantly different from other normal users. For instance, user 89 enjoys "Documentary" movies but he had never watched or dislike "Film-Noir" movies. The recommendation system is struggling at this situation.

![low accuracy users](_assets-1C/low-accuracy-users.png)

- However, the recommendation system did a good job overall. The recommendation accuracies for other users are fairly high. This is due to the fact that these users behave normally.

## Problem 2. Multi-Task Learning

### Discussion of Data Characteristics and Pre-processing

### Model Development and Hyper-parameter Selection

### Analysis of Results
