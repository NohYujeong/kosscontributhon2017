package com.ankus;

import org.apache.hadoop.io.WritableComparable;
import org.apache.hadoop.io.WritableComparator;

public class TaggedGroupKeyComparator extends WritableComparator {

  protected TaggedGroupKeyComparator() {
    super(TaggedKey.class, true);
  }

  @SuppressWarnings("rawtypes")
  @Override
  public int compare(WritableComparable w1, WritableComparable w2) {
    TaggedKey k1 = (TaggedKey) w1;
    TaggedKey k2 = (TaggedKey) w2;

    // 그룹?��?�� ?��공사 코드�? ?��?��
    return k1.getCarrierCode().compareTo(k2.getCarrierCode());
  }
}
