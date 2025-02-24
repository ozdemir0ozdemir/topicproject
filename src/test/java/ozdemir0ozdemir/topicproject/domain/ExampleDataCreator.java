package ozdemir0ozdemir.topicproject.domain;

import java.time.Clock;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.*;
import java.util.stream.Collectors;
import java.util.stream.IntStream;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import ozdemir0ozdemir.topicproject.util.Sanitizer;

@Configuration
public class ExampleDataCreator {

	@Bean
	CommandLineRunner runner(DefinitionRepository definitionRepository, TopicRepository topicRepository, Clock clock) {
		return args -> {
			List<String> topicList = new ArrayList<>();
			topicList.add("Lorem ipsum dolor sit amet");
			topicList.add("consectetur adipiscing elit");
			topicList.add("Etiam tincidunt eleifend neque");
			topicList.add("Nam non tellus lacus");
			topicList.add("altmış karakter uzunluğunda bir başlık yazıyorum bu bir yazı");
			topicList.add("yetmiş karakter uzunluğunda bir başlık yazıyorum bu bir yazıdır başlık");
			topicList.add("seksen karakter uzunluğunda bir başlık yazıyorum bu bir yazıdır başlık ve seksen");
			topicList.add("doksan karakter uzunluğunda bir başlık yazıyorum bu bir yazıdır başlık ve doksan karakteri");
			topicList.add(
					"yüz karakter uzunluğunda bir başlık yazıyorum bu bir yazıdır başlık ve yüz karakter bulunuyor bu yaz");
			topicList.add(
					"yüz-on karakter uzunluğunda bir başlık yazıyorum bu bir yazıdır başlık ve yüz-on karakter bulunur bu yazıda mı");
			topicList.add("scelerisque nunc");
			topicList.add("Pellentesque cursus efficitur risus");
			topicList.add("non ullamcorper mauris eleifend a");
			topicList.add("Integer consequat sapien a rutrum consequat");
			topicList.add("Morbi non erat dolor");
			topicList.add("Nam sagittis facilisis quam");
			topicList.add("in placerat odio");
			topicList.add("Sed eget sapien id ligula auctor suscipit at laoreet erat");
			topicList.add("Sed nunc lectus");
			topicList.add("aliquet ac tincidunt a");
			topicList.add("ullamcorper non nibh");
			topicList.add("Quisque vulputate suscipit malesuada");
			topicList.add("Suspendisse pharetra erat enim");
			topicList.add("quis ultricies purus viverra id");
			topicList.add("Duis scelerisque laoreet felis et rhoncus");
			topicList.add("Praesent consequat libero leo");
			topicList.add("maximus porta velit dapibus eget");
			topicList.add("Curabitur congue erat odio");
			topicList.add("at mollis neque ultricies nec");
			topicList.add("Sed id malesuada justo");
			topicList.add("In a dapibus justo");
			topicList.add("In sagittis eros in quam pellentesque mollis");
			topicList.add("Praesent dapibus mattis dapibus");
			topicList.add("In ipsum leo");
			topicList.add("rutrum vel pretium vitae");
			topicList.add("lobortis gravida lacus");


			List<String> definitionList = new ArrayList<>();
			definitionList.add(
					"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam tincidunt eleifend neque. Nam non tellus lacus. Sed massa eros, luctus nec sodales a, lacinia sit amet nibh. Nunc elementum mauris scelerisque, convallis nunc vitae, scelerisque nunc. Pellentesque cursus efficitur risus, non ullamcorper mauris eleifend a. Integer consequat sapien a rutrum consequat. Morbi non erat dolor. Nam sagittis facilisis quam, in placerat odio. Sed eget sapien id ligula auctor suscipit at laoreet erat. Nam at mauris molestie ante gravida imperdiet.");
			definitionList.add(
					"Sed nunc lectus, aliquet ac tincidunt a, ullamcorper non nibh. Quisque vulputate suscipit malesuada. Suspendisse pharetra erat enim, quis ultricies purus viverra id. Duis scelerisque laoreet felis et rhoncus. Praesent consequat libero leo, maximus porta velit dapibus eget. Curabitur congue erat odio, at mollis neque ultricies nec. Sed id malesuada justo. In a dapibus justo. In sagittis eros in quam pellentesque mollis.");
			definitionList.add(
					"Morbi tempus mauris a erat consectetur viverra eget non risus. Morbi pellentesque nunc nec enim tempus interdum. Suspendisse sit amet egestas odio. Morbi ipsum felis, tristique quis scelerisque ac, tempus vel ligula. Donec commodo tortor eu pretium pretium. In hac habitasse platea dictumst. Vivamus ex nisl, feugiat et quam a, fringilla sollicitudin orci. Nullam et sollicitudin risus, laoreet scelerisque nisl. Vivamus id risus mattis, malesuada augue id, feugiat lectus. Phasellus aliquam dolor faucibus, ultricies risus quis, varius velit. Proin aliquet felis eget rutrum euismod.");
			definitionList.add(
					"Aliquam sem mi, tempor vitae purus vel, mattis malesuada lorem. Morbi ac erat sed elit venenatis ornare. Donec nulla leo, interdum sed molestie ac, malesuada ut purus. Quisque condimentum est risus, ac imperdiet nisi lobortis quis. Integer vel dui vel ligula semper convallis. Nulla vel sem tortor. Donec sit amet metus quam. Maecenas cursus lectus in eleifend facilisis. Etiam bibendum, risus nec blandit mollis, nulla felis condimentum sapien, et malesuada ligula magna vel ligula. Vestibulum ante tellus, condimentum id varius eu, venenatis sed eros. Mauris sollicitudin nisi eu tellus aliquet bibendum.");
			definitionList.add(
					"Praesent dapibus mattis dapibus. Phasellus ut dolor sed enim tempus sodales. In ipsum leo, rutrum vel pretium vitae, lobortis gravida lacus. Nulla at tristique mauris. Vivamus condimentum, ligula nec malesuada congue, magna libero vehicula libero, vitae ornare erat nisl sit amet lorem. Praesent cursus erat ac venenatis placerat. Phasellus at imperdiet turpis, quis sagittis nulla. Etiam luctus, enim vitae porta egestas, enim lorem auctor est, eget eleifend erat mi ac lacus. Nunc et suscipit mauris. Mauris mollis, mi id ultrices semper, ex sem fringilla ligula, at efficitur lorem nunc eu sem. Sed pulvinar varius lacinia.");
			definitionList.add(
					"Vivamus commodo vulputate eros et pellentesque. Sed sodales ac quam ac egestas. Maecenas eleifend posuere est, sit amet maximus dolor hendrerit nec. Phasellus lacinia neque id sollicitudin imperdiet. Donec consequat nibh diam, dapibus scelerisque eros iaculis a. Fusce et faucibus nunc. Sed eget diam velit.");
			definitionList.add(
					"Etiam fringilla tristique rutrum. Etiam luctus ligula quis libero consectetur, at lobortis nisl faucibus. Nunc vel nunc mi. Interdum et malesuada fames ac ante ipsum primis in faucibus. Proin vel sapien in nunc blandit gravida. Curabitur tortor orci, porta id condimentum at, malesuada ut neque. Nam porta placerat lorem. Quisque ornare enim nunc, in finibus felis vestibulum id. Suspendisse non aliquet ligula. Curabitur viverra suscipit neque sit amet vulputate. Suspendisse placerat fermentum facilisis. In varius, risus quis pretium suscipit, leo erat eleifend diam, ut pharetra ligula quam in leo.");
			definitionList.add(
					"Etiam dignissim libero sit amet nibh rutrum dictum. Integer neque nibh, viverra ac tincidunt vel, fringilla nec quam. Etiam magna tellus, pulvinar consectetur urna id, vulputate varius diam. Nam mi mauris, maximus eu erat eu, maximus tempus massa. Nam quis blandit augue, eu vehicula sem. Quisque nunc eros, dignissim quis blandit ut, maximus at tortor. Nullam tincidunt dui at nisl consequat, in semper metus posuere. Phasellus at metus pulvinar, dignissim tortor hendrerit, mollis tellus. Aenean tincidunt imperdiet pulvinar. Pellentesque feugiat erat eu placerat euismod. Proin augue est, finibus sed dapibus vitae, placerat eget sem. Donec gravida eleifend tellus sed accumsan.");
			definitionList.add(
					"Ut nec risus tincidunt orci porttitor dapibus. Morbi sed imperdiet leo. Nullam et mi dui. Morbi viverra eros hendrerit ex hendrerit, et dignissim ipsum sagittis. Fusce eu tortor egestas, efficitur enim ac, egestas ex. Nullam mi ipsum, pulvinar at tincidunt at, pharetra sed nisl. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent vitae sodales leo. Integer imperdiet lobortis libero. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas sed viverra metus, in fringilla ante. Curabitur bibendum odio ut semper sagittis. Phasellus ullamcorper ante ac massa laoreet hendrerit. Nunc sit amet enim elit. Ut ultricies sollicitudin pharetra. Curabitur ornare mi eget cursus maximus.");
			definitionList.add(
					"Mauris tincidunt rhoncus dolor et elementum. Morbi velit massa, mollis nec tortor at, mattis bibendum mi. Sed magna urna, semper et arcu quis, vehicula posuere lectus. Nullam quis feugiat purus, consectetur feugiat nibh. Cras a neque imperdiet, pretium ex eu, commodo nulla. Phasellus fringilla, nibh vitae auctor vehicula, urna turpis tristique ex, eget hendrerit magna turpis ac ipsum. Nullam eu vulputate sapien. Phasellus ac tristique dui. Suspendisse in facilisis turpis.");


			Random random = new Random();

			List<Topic> topics = new ArrayList<>();
			topicList.forEach(title -> topics.add(new Topic()
					.setTitle(title.toLowerCase(Locale.ENGLISH))
					.setSanitizedTitle(Sanitizer.sanitizeTitle(title.toLowerCase(Locale.ENGLISH)))
					.setCreatedAt(Date.from(Instant.now(clock).minus(random.nextInt(2), ChronoUnit.DAYS)))));

			topicRepository.saveAll(topics);

			List<Definition> definitions = new ArrayList<>();
			topics.forEach(topic -> {
				int rnd1 = random.nextInt(0, definitionList.size());
				int rnd2 = random.nextInt(0, definitionList.size());

				int left = Math.min(rnd1, rnd2);
				int right = Math.max(rnd1, rnd2);

				List<Integer> ids = IntStream.range(left, right).boxed().collect(Collectors.toList());

				Collections.shuffle(ids);

				ids.forEach(id -> {
					Definition def = new Definition()
							.setTopic(topic)
							.setDefinition(definitionList.get(id).toLowerCase(Locale.ENGLISH))
							.setCreatedAt(Date.from(Instant.now(clock).minus(random.nextInt(2) , ChronoUnit.DAYS)));
					definitions.add(def);
				});
			});

			definitionRepository.saveAll(definitions);
		};
	}
}
